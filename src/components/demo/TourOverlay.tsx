"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDemoContext } from "./DemoContext";
import type { TourStep } from "@/lib/demo/types";
import styles from "./TourOverlay.module.css";

const TOUR_STEPS: TourStep[] = [
  {
    target: "sidebar",
    title: "Your CRM, Your Brand",
    description:
      "Every element uses your colors and branding. This is what your team would see every day.",
    view: "dashboard",
  },
  {
    target: "kpis",
    title: "Real-Time Metrics",
    description:
      "Pipeline value, active deals, conversion rates — the metrics that matter for your business, updated in real time.",
    view: "dashboard",
  },
  {
    target: "funnel",
    title: "Pipeline at a Glance",
    description:
      "See where every deal stands. No more spreadsheets or guessing — your revenue funnel, visualized.",
    view: "dashboard",
  },
  {
    target: "activity",
    title: "Every Interaction Tracked",
    description:
      "Every call, email, and meeting logged. Your team stays aligned without status meetings.",
    view: "dashboard",
  },
  {
    target: "pipeline",
    title: "Visual Pipeline",
    description:
      "Drag-and-drop deal management. Your stages, your workflow, your rules. Try dragging a card.",
    view: "pipeline",
  },
  {
    target: "contacts",
    title: "Contact Intelligence",
    description:
      "Every interaction tracked. Follow-up reminders that actually work. Never lose a deal to silence.",
    view: "contacts",
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function TourOverlay() {
  const { state, dispatch } = useDemoContext();
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = TOUR_STEPS[state.tourStep - 1];
  const stepCount = TOUR_STEPS.length;

  // Lock body scroll while tour is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const scrollToAndMeasure = useCallback(() => {
    if (!currentStep) return;
    const el = document.querySelector(`[data-tour="${currentStep.target}"]`);
    if (!el) return;

    // Find the scrollable main container
    const scrollContainer = document.querySelector("[data-demo-main]") as HTMLElement | null;

    // Scroll the element into view within the main content area
    if (scrollContainer) {
      const elTop = (el as HTMLElement).offsetTop;
      const containerHeight = scrollContainer.clientHeight;
      // Scroll so the element is roughly centered in the container
      const scrollTarget = Math.max(0, elTop - containerHeight / 3);
      scrollContainer.scrollTo({ top: scrollTarget, behavior: "smooth" });
    }

    // Measure after scroll animation settles
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    // Measure immediately and again after scroll finishes
    measure();
    setTimeout(measure, 400);
  }, [currentStep]);

  // Switch view if needed, scroll to target, and measure
  useEffect(() => {
    if (!currentStep) return;

    if (currentStep.view && currentStep.view !== state.activeView) {
      dispatch({ type: "SET_ACTIVE_VIEW", view: currentStep.view });
      // Wait for view to render, then scroll and measure
      const timer = setTimeout(scrollToAndMeasure, 150);
      return () => clearTimeout(timer);
    } else {
      scrollToAndMeasure();
    }
  }, [currentStep, state.activeView, dispatch, scrollToAndMeasure]);

  // Remeasure on resize
  useEffect(() => {
    window.addEventListener("resize", scrollToAndMeasure);
    return () => window.removeEventListener("resize", scrollToAndMeasure);
  }, [scrollToAndMeasure]);

  function handleNext() {
    setTransitioning(true);
    setTimeout(() => {
      dispatch({ type: "TOUR_NEXT" });
      setTransitioning(false);
    }, 300);
  }

  function handlePrev() {
    setTransitioning(true);
    setTimeout(() => {
      dispatch({ type: "TOUR_PREV" });
      setTransitioning(false);
    }, 300);
  }

  function handleSkip() {
    dispatch({ type: "TOUR_END" });
    if (state.leadId) {
      fetch("/api/demo/save-lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: state.leadId, tourCompleted: false }),
      }).catch(() => {});
    }
  }

  if (!currentStep || !targetRect) return null;

  // Position tooltip relative to target
  const pad = 16;
  const tooltipStyle: React.CSSProperties = {
    top: targetRect.top + targetRect.height + pad,
    left: Math.max(pad, Math.min(targetRect.left, window.innerWidth - 360)),
  };

  // If tooltip would overflow bottom, show above
  if (targetRect.top + targetRect.height + 260 > window.innerHeight) {
    tooltipStyle.top = Math.max(pad, targetRect.top - 260);
  }

  return (
    <div className={styles.overlay}>
      {/* Spotlight cutout via box-shadow */}
      <div
        className={styles.spotlight}
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
        }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`${styles.tooltip} ${transitioning ? styles.tooltipHidden : ""}`}
        style={tooltipStyle}
      >
        <div className={styles.tooltipStep}>
          {state.tourStep} of {stepCount}
        </div>
        <h3 className={styles.tooltipTitle}>{currentStep.title}</h3>
        <p className={styles.tooltipDesc}>{currentStep.description}</p>
        <div className={styles.tooltipNav}>
          <button
            className={styles.tooltipSkip}
            onClick={handleSkip}
          >
            Skip tour
          </button>
          <div className={styles.tooltipBtns}>
            {state.tourStep > 1 && (
              <button className={styles.tooltipBtn} onClick={handlePrev}>
                Back
              </button>
            )}
            <button
              className={`${styles.tooltipBtn} ${styles.tooltipBtnPrimary}`}
              onClick={handleNext}
            >
              {state.tourStep >= stepCount ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
