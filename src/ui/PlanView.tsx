import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import type { PlanStep } from "../agent/types.ts";
import { C } from "./theme.ts";

const STYLE = {
  done: { icon: "✓", color: C.green },
  current: { icon: "▸", color: C.yellow },
  pending: { icon: "○", color: C.muted },
} as const;

/** The agent's live plan: pending (gray), current (yellow), done (green). */
export function PlanView(props: { steps: PlanStep[]; source: "model" | "auto"; running: boolean }) {
  const done = props.steps.filter((s) => s.status === "done").length;
  return (
    <Box flexDirection="column" paddingX={1}>
      <Box>
        <Text color={C.muted}>Plan </Text>
        <Text color={C.faint}>{props.steps.length ? `${done}/${props.steps.length}` : ""}{props.source === "auto" && props.steps.length ? "  (from tool calls)" : ""}</Text>
      </Box>
      {props.steps.length === 0 ? (
        <Text color={C.faint}>  {props.running ? "Waiting for Artemis to publish a plan…" : "No active plan. Give Artemis a task below."}</Text>
      ) : (
        props.steps.map((s, i) => {
          const st = STYLE[s.status];
          return (
            <Box key={i}>
              <Box width={4} paddingLeft={2}>
                {s.status === "current" && props.running ? <Text color={st.color}><Spinner type="dots" /></Text> : <Text color={st.color}>{st.icon}</Text>}
              </Box>
              <Text color={st.color} bold={s.status === "current"} wrap="truncate-end">{s.title}</Text>
            </Box>
          );
        })
      )}
    </Box>
  );
}
