"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useDemoContext } from "./DemoContext";
import type { DemoData, DemoDeal } from "@/lib/demo/types";
import styles from "./DemoPipeline.module.css";

interface Props {
  data: DemoData;
  industryLabel: string;
}

function formatValue(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export default function DemoPipeline({ data, industryLabel }: Props) {
  const { state, dispatch } = useDemoContext();
  const deals = state.deals;

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const dealId = result.draggableId;
    const newStage = result.destination.droppableId;

    const updated = deals.map((d) =>
      d.id === dealId ? { ...d, stage: newStage, daysInStage: 0 } : d,
    );
    dispatch({ type: "SET_DEALS", deals: updated });
  }

  // Group deals by stage
  const grouped: Record<string, DemoDeal[]> = {};
  for (const stage of data.pipelineStages) {
    grouped[stage] = deals.filter((d) => d.stage === stage);
  }

  return (
    <div className={styles.pipeline} data-tour="pipeline">
      <header className={styles.header}>
        <h2 className={styles.title}>{industryLabel} Pipeline</h2>
        <span className={styles.count}>
          {deals.length} {industryLabel.toLowerCase()}
        </span>
      </header>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.board}>
          {data.pipelineStages.map((stage, colIdx) => {
            const stageDeals = grouped[stage] || [];
            const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);

            return (
              <Droppable key={stage} droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${styles.column} ${snapshot.isDraggingOver ? styles.columnOver : ""}`}
                    style={{ animationDelay: `${colIdx * 80}ms` }}
                  >
                    <div className={styles.colHeader}>
                      <span className={styles.colName}>{stage}</span>
                      <div className={styles.colMeta}>
                        <span className={styles.colCount}>{stageDeals.length}</span>
                        <span className={styles.colTotal}>{formatValue(stageTotal)}</span>
                      </div>
                    </div>

                    <div className={styles.cards}>
                      {stageDeals.map((deal, i) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={i}>
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className={`${styles.dealCard} ${dragSnapshot.isDragging ? styles.dealCardDragging : ""}`}
                            >
                              <span className={styles.dealCompany}>{deal.company}</span>
                              <span className={styles.dealContact}>{deal.contact}</span>
                              <div className={styles.dealFooter}>
                                <span className={styles.dealValue}>{formatValue(deal.value)}</span>
                                <span className={styles.dealAge}>
                                  {deal.daysInStage}d in stage
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
