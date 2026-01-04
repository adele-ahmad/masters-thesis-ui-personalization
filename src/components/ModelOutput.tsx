'use client';

import { usePersonalization } from '@/contexts/PersonalizationContext';
import styles from '@/styles/ModelOutput.module.css';

export default function ModelOutput() {
  const { modelPrediction, isPersonalized } = usePersonalization();

  if (!isPersonalized || !modelPrediction) {
    return (
      <div className={styles.output}>
        <h2>Model Output</h2>
        <p className={styles.placeholder}>
          Run personalization to see model predictions
        </p>
      </div>
    );
  }

  return (
    <div className={styles.output}>
      <h2>Model Output</h2>
      
      <div className={styles.prediction}>
        <div className={styles.mainResult}>
          <span className={styles.label}>Predicted Class:</span>
          <span className={styles.className}>{modelPrediction.className}</span>
        </div>
        
        <div className={styles.confidence}>
          <span className={styles.label}>Confidence:</span>
          <span className={styles.value}>
            {(modelPrediction.confidence * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className={styles.probabilities}>
        <h3>Class Probabilities</h3>
        {modelPrediction.probabilities.map((prob, index) => {
          const classNames = ['Low Engagement', 'Medium Engagement', 'High Engagement'];
          return (
            <div key={index} className={styles.probBar}>
              <div className={styles.probLabel}>
                <span>{classNames[index]}</span>
                <span className={styles.probValue}>{(prob * 100).toFixed(1)}%</span>
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={styles.bar}
                  style={{ width: `${prob * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}