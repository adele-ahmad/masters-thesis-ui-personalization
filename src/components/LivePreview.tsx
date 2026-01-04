'use client';

import { usePersonalization } from '@/contexts/PersonalizationContext';
import styles from '@/styles/LivePreview.module.css';

export default function LivePreview() {
  const { isPersonalized, uiProfile } = usePersonalization();

  return (
    <div className={styles.preview}>
      <div className={styles.header}>
        <h2>Live Preview</h2>
        {isPersonalized && (
          <span className={styles.badge}>✓ Personalized</span>
        )}
      </div>
      <p className={styles.subtitle}>
        {isPersonalized ? 'UI personalized based on your profile - notice the size and spacing changes!' : 'Run personalization to see dramatic changes'}
      </p>
      <p className={styles.disclaimer}>
        Note: Manual adjustments to User Context and UI/UX sliders may have subtle or inconsistent effects. These controls are reserved for future development and fine-tuning capabilities.
      </p>
      <div className={styles.content}>
        <div className={styles.demo}>
          <h3>Sample Content</h3>
          <p>
            This preview demonstrates how your UI will adapt based on the AI model prediction.
            Typography, spacing, and component styling all adjust dynamically.
          </p>

          

          <div className={styles.card}>
            <h4>Sample Card</h4>
            <p>Card components adapt their padding, border radius, and shadow based on your preferences.</p>
          </div>

          <div className={styles.list}>
            <div className={styles.listItem}>Item with adaptive spacing</div>
            <div className={styles.listItem}>Typography scales appropriately</div>
            <div className={styles.listItem}>Motion timing adjusts</div>
          </div>
        </div>

        {isPersonalized && (
          <div className={styles.stats}>
            <h4>Current Settings</h4>
            <div className={styles.stat}>
              <span>Typography Base:</span>
              <strong>{uiProfile.typographyBase}px</strong>
            </div>
            <div className={styles.stat}>
              <span>Spacing Base:</span>
              <strong>{uiProfile.spacingBase}px</strong>
            </div>
            <div className={styles.stat}>
              <span>Density:</span>
              <strong>{uiProfile.componentDensity}</strong>
            </div>
            <div className={styles.stat}>
              <span>Color Scheme:</span>
              <strong>{uiProfile.colorScheme}</strong>
            </div>
            <div className={styles.stat}>
              <span>Accent Color:</span>
              <strong style={{ color: uiProfile.accentColor }}>{uiProfile.accentColor}</strong>
            </div>
            <div className={styles.stat}>
              <span>Contrast:</span>
              <strong>{uiProfile.contrastLevel}</strong>
            </div>
            <div className={styles.stat}>
              <span>Motion:</span>
              <strong>{uiProfile.motion}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}