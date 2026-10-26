import { Box, Text } from "ink";
import type { Mode, Phase } from "../agent/types.ts";
import { C, fmtMs, fmtTokens, PHASE_BADGE, SAFETY } from "./theme.ts";

/** Footer: phase badge (inverse), tokens used/limit, safety mode, step, elapsed, abort hint. */
export function StatusLine(props: { phase: Phase; tokensUsed: number; tokenLimit: number; mode: Mode; step: number; maxSteps: number; elapsedMs: number; running: boolean; expanded: boolean }) {
  const badge = PHASE_BADGE[props.phase];
  const safety = SAFETY[props.mode];
  const pct = props.tokenLimit ? props.tokensUsed / props.tokenLimit : 0;
  const tokColor = pct > 0.9 ? C.red : pct > 0.7 ? C.orange : C.text;
  return (
    <Box paddingX={1} justifyContent="space-between">
      <Box>
        <Text inverse bold color={badge.color}>{` ${badge.label} `}</Text>
        <Text color={C.faint}> │ </Text>
        <Text color={C.muted}>tokens </Text>
        <Text color={tokColor}>{fmtTokens(props.tokensUsed)}</Text>
        <Text color={C.faint}>/{fmtTokens(props.tokenLimit)}</Text>
        <Text color={C.faint}> │ </Text>
        <Text bold color={safety.color}>{safety.label}</Text>
        <Text color={C.faint}> │ </Text>
        <Text color={C.muted}>step </Text>
        <Text color={C.text}>{props.step}/{props.maxSteps}</Text>
        <Text color={C.faint}> │ </Text>
        <Text color={C.text}>{fmtMs(props.elapsedMs)}</Text>
      </Box>
      <Text color={C.faint}>{"  "}{props.running ? "Esc to abort" : "ctrl+o " + (props.expanded ? "collapse" : "expand") + " · /help"}</Text>
    </Box>
  );
}
