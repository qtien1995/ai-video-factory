# Trộn tiếng: voice.wav + nhạc nền (tự nhỏ đi khi có giọng) + hiệu ứng từ sfx_events.json → mix.wav.
# Chạy trong thư mục dự án (build.py làm sẵn). Hiệu ứng tự tổng hợp bằng code, không cần thư viện âm thanh ngoài.
# Các loại hiệu ứng (kind): whoosh, whoosh_fast, whoosh_long, tick, click, pop, ding, bell_lo, shimmer, impact, scratch, outro.
import numpy as np, wave, json
SR=48000; TOT=json.load(open('timing.json'))['total']; N=int(SR*TOT)+SR
rng=np.random.default_rng(3)
def onepole(x,c):
    y=np.empty_like(x); acc=0.0
    for i,v in enumerate(x): acc+=c[i]*(v-acc) if hasattr(c,'__len__') else c*(v-acc); y[i]=acc
    return y
def whoosh(dur=.5,b=.15):
    n=int(SR*dur); t=np.arange(n)/SR; c=b*(.3+np.sin(np.pi*t/dur))
    return onepole(rng.standard_normal(n),c)*np.sin(np.pi*t/dur)**2*.5
def click(f=2400,g=1):
    n=int(SR*.05); t=np.arange(n)/SR
    return (np.sin(2*np.pi*f*t)*.6+rng.standard_normal(n)*.4)*np.exp(-t/.006)*g
def pop(f=880):
    n=int(SR*.18); t=np.arange(n)/SR; fr=f*(1+1.2*np.exp(-t/.02))
    return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t/.05)*.5
def bell(f,dur=1.6,g=.35):
    n=int(SR*dur); t=np.arange(n)/SR
    s=sum(a*np.sin(2*np.pi*f*m*t)*np.exp(-t/(dur*.35/m**.5)) for m,a in [(1,1),(2.01,.45),(3.02,.22),(4.2,.1)])
    return s*np.minimum(t/.004,1)*g
def impact():
    n=int(SR*.6); t=np.arange(n)/SR; f=60+90*np.exp(-t/.05)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/.18)*.9+onepole(rng.standard_normal(n),.2)*np.exp(-t/.03)*.4
def scratch():
    n=int(SR*.35); t=np.arange(n)/SR; return onepole(rng.standard_normal(n),.35)*np.sin(np.pi*t/.35)*.35
LIB={'whoosh':lambda:whoosh(.5,.15),'whoosh_fast':lambda:whoosh(.35,.3),'whoosh_long':lambda:whoosh(.9,.09),
 'tick':lambda:click(rng.uniform(3000,4200),.3),'click':lambda:click(),'pop':lambda:pop(rng.choice([660,784,880])),
 'ding':lambda:bell(rng.choice([1046.5,1174.7,1318.5]),.9,.3),'bell_lo':lambda:bell(587.3,2.2,.4),
 'shimmer':lambda:sum(bell(f,1.8,.18) for f in [1174.7,1568,2349.3]),'impact':impact,'scratch':scratch,
 'outro':lambda:sum(bell(f,3.0,.3) for f in [293.7,440,587.3,880])+np.pad(whoosh(1.2,.06),(0,int(1.8*SR)))}
GAIN={'tick':.55,'whoosh':.55,'whoosh_fast':.5,'whoosh_long':.5,'pop':.45,'click':.7,'ding':.5,'bell_lo':.5,'shimmer':.5,'impact':.6,'scratch':.6,'outro':.8}
fx=np.zeros((N,2))
for e in json.load(open('sfx_events.json')):
    s=LIB[e['kind']]()*GAIN[e['kind']]*e['g']; i=int(e['t']*SR); s=s[:N-i]; pan=rng.uniform(-.25,.25)
    fx[i:i+len(s),0]+=s*(1-pan); fx[i:i+len(s),1]+=s*(1+pan)
# music: slow pad + soft arpeggio, chords every 4 s
t=np.arange(N)/SR; mus=np.zeros(N)
CH=[[146.8,174.6,220,261.6,329.6],[116.5,146.8,174.6,220,293.7],[87.3,130.8,174.6,220,261.6],[130.8,164.8,196,246.9,293.7]]
seg=4.0
for k in range(int(TOT/seg)+2):
    a,b=int(k*seg*SR),int((k+1)*seg*SR+SR); b=min(b,N)
    if a>=N: break
    tt=t[a:b]-k*seg; e=np.minimum(tt/1.0,1)*np.clip((seg+1-tt)/1.0,0,1)
    for f in CH[k%4]: mus[a:b]+=np.sin(2*np.pi*f*tt+.4*np.sin(2*np.pi*.2*tt))*e*.06
    for j in range(8):  # eighth-note arpeggio
        i0=a+int(j*.5*SR); f=CH[k%4][j%5]*2; n=int(.9*SR)
        if i0+n<N: tn=np.arange(n)/SR; mus[i0:i0+n]+=np.sin(2*np.pi*f*tn)*np.exp(-tn/.25)*.035
mus*=np.minimum(t/2,1)*np.clip((TOT-t)/2.5,0,1)
# voice (22.05k -> 48k)
w=wave.open('voice.wav'); v=np.frombuffer(w.readframes(w.getnframes()),'<i2').astype(np.float32)/32768
v=np.interp(np.arange(int(len(v)*SR/22050))*22050/SR,np.arange(len(v)),v); voice=np.zeros(N); voice[:len(v)]=v[:N]
# duck music under voice
env=np.convolve(np.abs(voice),np.ones(2400)/2400,'same'); env=np.clip(env/0.03,0,1)
env=np.maximum.accumulate(env[::-1])[::-1]*0+env; sm=onepole(env,0.0004)
mus*=1-.55*sm
out=np.stack([voice*.95+mus,voice*.95+mus],1)+fx*.8
out=np.tanh(out*1.1)/1.1; out*=0.93/np.abs(out).max()
with wave.open('mix.wav','wb') as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR); f.writeframes((out*32767).astype('<i2').tobytes())
print('ok')
