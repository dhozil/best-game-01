export function title(ctx) {
  ctx.save();
  ctx.fillStyle = "#050d1ce8";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.textAlign = "center";
  ctx.shadowColor = "#58f6d8";
  ctx.shadowBlur = 30;
  ctx.fillStyle = "#58f6d8";
  ctx.font = "900 80px sans-serif";
  ctx.fillText("PRISM DRIFT", ctx.canvas.width / 2, 210);
  ctx.shadowBlur = 0;
  ctx.font = "22px monospace";
  ctx.fillStyle = "#ffd881";
  ctx.fillText("Your wake is a weapon.", ctx.canvas.width / 2, 270);
  ctx.font = "14px monospace";
  ctx.fillStyle = "#bacbdf";
  ["WASD/ARROWS drift · MOUSE aim + fire", "1/2/3 choose · M sound · Q glow · R restart",
   "Original art, code and synth sound — built for make.fun's best-game-01 bounty."].forEach((text, i) => ctx.fillText(text, ctx.canvas.width / 2, 330 + i * 32));
  ctx.restore();
}
