export function calculateTimelineDuration(spec) {
  const targetDurationMs = spec.format?.targetDurationMs || 0;
  
  let actualDurationMs = 0;
  
  if (spec.script && spec.script.scenes && spec.script.scenes.length > 0) {
    let hasStartMs = spec.script.scenes.some(s => s.startMs !== undefined && s.startMs !== null);
    
    if (hasStartMs) {
      // If scenes have explicit startMs, max(startMs + durationMs)
      actualDurationMs = Math.max(...spec.script.scenes.map(s => (s.startMs || 0) + (s.durationMs || 0)));
    } else {
      // If sequential, sum(durationMs)
      actualDurationMs = spec.script.scenes.reduce((sum, s) => sum + (s.durationMs || 0), 0);
    }
  }

  const deltaMs = targetDurationMs > 0 ? actualDurationMs - targetDurationMs : 0;

  return {
    actualDurationMs,
    targetDurationMs,
    deltaMs
  };
}
