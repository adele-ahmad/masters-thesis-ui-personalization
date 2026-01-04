'use client';

import { usePersonalization } from '@/contexts/PersonalizationContext';
import styles from '@/styles/PersonalizationPanel.module.css';

export default function PersonalizationPanel() {
  const { userProfile, updateUserProfile, modelStatus, runPersonalization, applyPresetDirectly } = usePersonalization();

  const handleInputChange = (field: string, value: string | number) => {
    updateUserProfile({ [field]: value });
  };

  const applyPreset = (preset: 'minimal' | 'balanced' | 'rich') => {
    if (preset === 'minimal') {
      updateUserProfile({
        age: 65,
        userExperience: 'Confusing',
        colorScheme: 5,
        visualHierarchy: 5,
        layout: 5,
        accessibility: 5,
        animationTransitions: 3,
        imagesMultimedia: 3,
        mobileResponsiveness: 5,
        ctaButtons: 5,
        formsInputFields: 5,
        feedbackErrorMessages: 5,
        loadingSpeed: 5,
        personalization: 3,
        scrollingBehavior: 5,
        gesturesTouchControls: 4,
        searchFunctionality: 5,
        socialMediaIntegration: 3
      });
      
      // Directly apply the minimal UI profile
      applyPresetDirectly({
        typographyBase: 20,
        typographyScale: 1.35,
        spacingBase: 16,
        spacingScale: 2.0,
        componentDensity: 'spacious',
        contrastLevel: 'high',
        motion: 'reduced',
        focusRingThickness: 4,
        borderRadius: 16,
        shadowIntensity: 0.02,
        colorScheme: 'grey',
        accentColor: '#5cb85c'
      });
    } else if (preset === 'balanced') {
      updateUserProfile({
        age: 35,
        userExperience: 'User-Friendly',
        colorScheme: 4,
        visualHierarchy: 4,
        layout: 4,
        accessibility: 4,
        animationTransitions: 4,
        imagesMultimedia: 4,
        mobileResponsiveness: 4,
        ctaButtons: 4,
        formsInputFields: 4,
        feedbackErrorMessages: 4,
        loadingSpeed: 4,
        personalization: 4,
        scrollingBehavior: 4,
        gesturesTouchControls: 4,
        searchFunctionality: 4,
        socialMediaIntegration: 4
      });
      
      // Directly apply the balanced UI profile
      applyPresetDirectly({
        typographyBase: 16,
        typographyScale: 1.2,
        spacingBase: 10,
        spacingScale: 1.6,
        componentDensity: 'normal',
        contrastLevel: 'medium',
        motion: 'normal',
        focusRingThickness: 2,
        borderRadius: 8,
        shadowIntensity: 0.1,
        colorScheme: 'dark',
        accentColor: '#4a9eff'
      });
    } else {
      updateUserProfile({
        age: 22,
        userExperience: 'Engaging',
        colorScheme: 3,
        visualHierarchy: 3,
        layout: 3,
        accessibility: 3,
        animationTransitions: 5,
        imagesMultimedia: 5,
        mobileResponsiveness: 4,
        ctaButtons: 3,
        formsInputFields: 3,
        feedbackErrorMessages: 3,
        loadingSpeed: 3,
        personalization: 5,
        scrollingBehavior: 3,
        gesturesTouchControls: 5,
        searchFunctionality: 4,
        socialMediaIntegration: 5
      });
      
      // Directly apply the rich UI profile
      applyPresetDirectly({
        typographyBase: 14,
        typographyScale: 1.1,
        spacingBase: 6,
        spacingScale: 1.3,
        componentDensity: 'compact',
        contrastLevel: 'low',
        motion: 'enhanced',
        focusRingThickness: 2,
        borderRadius: 4,
        shadowIntensity: 0.2,
        colorScheme: 'vibrant',
        accentColor: '#ff6b9d'
      });
    }
  };

  return (
    <div className={styles.panel}>
      <h2>Personalization Panel</h2>
      <p className={styles.description}>
        Configure your profile to receive AI-driven UI personalization
      </p>

      <div className={styles.form}>
        <div className={styles.section}>
          <h3>Quick Presets</h3>
          <div className={styles.presets}>
            <button 
              onClick={() => applyPreset('minimal')}
              className={styles.presetBtn}
              disabled={modelStatus !== 'ready'}
            >
              <div className={styles.presetIcon}>👴</div>
              <div className={styles.presetLabel}>Minimal</div>
              <div className={styles.presetDesc}>Large, simple, high contrast</div>
            </button>
            <button 
              onClick={() => applyPreset('balanced')}
              className={styles.presetBtn}
              disabled={modelStatus !== 'ready'}
            >
              <div className={styles.presetIcon}>👤</div>
              <div className={styles.presetLabel}>Balanced</div>
              <div className={styles.presetDesc}>Moderate sizing & features</div>
            </button>
            <button 
              onClick={() => applyPreset('rich')}
              className={styles.presetBtn}
              disabled={modelStatus !== 'ready'}
            >
              <div className={styles.presetIcon}>🎮</div>
              <div className={styles.presetLabel}>Rich</div>
              <div className={styles.presetDesc}>Compact, animated, detailed</div>
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h3>User Context</h3>
          
          <div className={styles.field}>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              min="19"
              max="76"
              value={userProfile.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={userProfile.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="platform">Platform</label>
            <select
              id="platform"
              value={userProfile.platform}
              onChange={(e) => handleInputChange('platform', e.target.value)}
            >
              <option value="Website">Website</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="Youtube">Youtube</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="experience">User Experience</label>
            <select
              id="experience"
              value={userProfile.userExperience}
              onChange={(e) => handleInputChange('userExperience', e.target.value)}
            >
              <option value="Intuitive">Intuitive</option>
              <option value="User-Friendly">User-Friendly</option>
              <option value="Efficient">Efficient</option>
              <option value="Engaging">Engaging</option>
              <option value="Clear and concise">Clear and concise</option>
              <option value="Well-structured">Well-structured</option>
              <option value="Adequate">Adequate</option>
              <option value="Confusing">Confusing</option>
              <option value="Inconsistent Navigation">Inconsistent Navigation</option>
              <option value="Limited Menu Options">Limited Menu Options</option>
            </select>
          </div>
        </div>

        <div className={styles.section}>
          <h3>UI/UX Preferences (1-5)</h3>
          
          {[
            { key: 'colorScheme', label: 'Color Scheme' },
            { key: 'visualHierarchy', label: 'Visual Hierarchy' },
            { key: 'layout', label: 'Layout' },
            { key: 'accessibility', label: 'Accessibility' },
            { key: 'animationTransitions', label: 'Animation & Transitions' }
          ].map(({ key, label }) => (
            <div key={key} className={styles.field}>
              <label htmlFor={key}>
                {label}: <span className={styles.value}>{userProfile[key as keyof typeof userProfile]}</span>
              </label>
              <input
                id={key}
                type="range"
                min="3"
                max="5"
                value={userProfile[key as keyof typeof userProfile] as number}
                onChange={(e) => handleInputChange(key, parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          ))}
        </div>

        <button
          onClick={runPersonalization}
          disabled={modelStatus !== 'ready'}
          className={styles.button}
        >
          {modelStatus === 'loading' && 'Loading Model...'}
          {modelStatus === 'ready' && 'Run Personalization'}
          {modelStatus === 'error' && 'Model Error - Using Defaults'}
        </button>
      </div>
    </div>
  );
}
