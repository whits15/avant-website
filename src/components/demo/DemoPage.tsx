"use client";

import { DemoProvider, useDemoContext } from "./DemoContext";
import WizardStepInput from "./WizardStepInput";
import WizardStepQuestions from "./WizardStepQuestions";
import DemoShell from "./DemoShell";
import styles from "./DemoPage.module.css";

function DemoInner() {
  const { state } = useDemoContext();

  return (
    <div className={styles.page}>
      {state.step === "input" && <WizardStepInput />}
      {state.step === "questions" && <WizardStepQuestions />}
      {state.step === "demo" && <DemoShell />}
    </div>
  );
}

export default function DemoPage() {
  return (
    <DemoProvider>
      <DemoInner />
    </DemoProvider>
  );
}
