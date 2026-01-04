import PersonalizationPanel from '@/components/PersonalizationPanel';
import LivePreview from '@/components/LivePreview';
import ModelOutput from '@/components/ModelOutput';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>AI-Driven UI Personalization</h1>
        <p className={styles.subtitle}>
          Experience adaptive user interfaces powered by machine learning.
          Configure your profile and watch the UI transform in real-time based on AI predictions.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.panelColumn}>
            <PersonalizationPanel />
          </div>
          
          <div className={styles.resultsColumn}>
            <LivePreview />
            <ModelOutput />
          </div>
        </div>
      </section>

      <section className={styles.explanation}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Configure Profile</h3>
            <p>Enter your age, gender, platform preference, and UI/UX ratings</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>AI Prediction</h3>
            <p>TensorFlow.js model predicts your engagement level and UI preferences</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>UI Adapts</h3>
            <p>Typography, spacing, contrast, motion, and components adjust dynamically</p>
          </div>
        </div>
      </section>
    </div>
  );
}