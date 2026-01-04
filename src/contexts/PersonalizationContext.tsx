'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ModelPrediction, UIProfile, ModelStatus } from '../types/index';
import { modelService } from '../services/modelService';

interface PersonalizationContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  modelPrediction: ModelPrediction | null;
  uiProfile: UIProfile;
  modelStatus: ModelStatus;
  runPersonalization: () => Promise<void>;
  isPersonalized: boolean;
  applyPresetDirectly: (profile: UIProfile) => void;
}

const defaultUserProfile: UserProfile = {
  age: 25,
  gender: 'male',
  platform: 'Website',
  userExperience: 'User-Friendly',
  colorScheme: 4,
  visualHierarchy: 4,
  imagesMultimedia: 4,
  layout: 4,
  mobileResponsiveness: 4,
  ctaButtons: 4,
  formsInputFields: 4,
  feedbackErrorMessages: 4,
  loadingSpeed: 4,
  personalization: 4,
  accessibility: 4,
  animationTransitions: 4,
  scrollingBehavior: 4,
  gesturesTouchControls: 4,
  searchFunctionality: 4,
  socialMediaIntegration: 4
};

const defaultUIProfile: UIProfile = {
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
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [modelPrediction, setModelPrediction] = useState<ModelPrediction | null>(null);
  const [uiProfile, setUIProfile] = useState<UIProfile>(defaultUIProfile);
  const [modelStatus, setModelStatus] = useState<ModelStatus>('loading');
  const [isPersonalized, setIsPersonalized] = useState(false);

  useEffect(() => {
    const initModel = async () => {
      try {
        await modelService.initialize();
        setModelStatus('ready');
      } catch (error) {
        console.error('Model initialization failed:', error);
        setModelStatus('error');
      }
    };

    initModel();
  }, []);

  useEffect(() => {
    applyUIProfile(uiProfile);
  }, [uiProfile]);

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const runPersonalization = async () => {
    if (modelStatus !== 'ready') {
      console.error('Model not ready');
      return;
    }

    try {
      const prediction = await modelService.predict(userProfile);
      
      // Manual override based on age for demo purposes
      let forcedClassIndex = prediction.classIndex;
      if (userProfile.age >= 60) {
        forcedClassIndex = 0; // Force Low Engagement (Grey, Large)
      } else if (userProfile.age <= 25) {
        forcedClassIndex = 2; // Force High Engagement (Vibrant, Small)
      } else {
        forcedClassIndex = 1; // Force Medium Engagement (Dark, Normal)
      }
      
      const overriddenPrediction = {
        ...prediction,
        classIndex: forcedClassIndex,
        className: forcedClassIndex === 0 ? 'Low Engagement' : 
                   forcedClassIndex === 1 ? 'Medium Engagement' : 'High Engagement'
      };
      
      const newUIProfile = modelService.predictionToUIProfile(overriddenPrediction, userProfile);
      
      setModelPrediction(overriddenPrediction);
      setUIProfile(newUIProfile);
      setIsPersonalized(true);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  const applyPresetDirectly = (profile: UIProfile) => {
    setUIProfile(profile);
    setIsPersonalized(true);
    setModelPrediction({
      classIndex: profile.colorScheme === 'grey' ? 0 : profile.colorScheme === 'dark' ? 1 : 2,
      className: profile.colorScheme === 'grey' ? 'Low Engagement' : profile.colorScheme === 'dark' ? 'Medium Engagement' : 'High Engagement',
      confidence: 1.0,
      probabilities: [0, 0, 0]
    });
  };

  const applyUIProfile = (profile: UIProfile) => {
    const root = document.documentElement;
    
    // Typography
    root.style.setProperty('--font-base', `${profile.typographyBase}px`);
    root.style.setProperty('--font-scale', `${profile.typographyScale}`);
    root.style.setProperty('--font-h1', `${profile.typographyBase * Math.pow(profile.typographyScale, 3)}px`);
    root.style.setProperty('--font-h2', `${profile.typographyBase * Math.pow(profile.typographyScale, 2)}px`);
    root.style.setProperty('--font-h3', `${profile.typographyBase * profile.typographyScale}px`);
    root.style.setProperty('--font-small', `${profile.typographyBase * 0.875}px`);
    
    // Spacing
    root.style.setProperty('--space-1', `${profile.spacingBase}px`);
    root.style.setProperty('--space-2', `${profile.spacingBase * profile.spacingScale}px`);
    root.style.setProperty('--space-3', `${profile.spacingBase * Math.pow(profile.spacingScale, 2)}px`);
    root.style.setProperty('--space-4', `${profile.spacingBase * Math.pow(profile.spacingScale, 3)}px`);
    root.style.setProperty('--space-5', `${profile.spacingBase * Math.pow(profile.spacingScale, 4)}px`);
    
    // Component density
    const densityMap = {
      compact: { padding: '0.4rem 0.8rem', gap: '0.5rem', minHeight: '2.25rem' },
      normal: { padding: '0.75rem 1.5rem', gap: '1rem', minHeight: '3rem' },
      spacious: { padding: '1.25rem 2.5rem', gap: '2rem', minHeight: '4rem' }
    };
    const density = densityMap[profile.componentDensity];
    root.style.setProperty('--component-padding', density.padding);
    root.style.setProperty('--component-gap', density.gap);
    root.style.setProperty('--component-min-height', density.minHeight);
    
    // Color Schemes - FIXED VERSION
    let bg, surface, border, text, textSecondary;
    
    if (profile.colorScheme === 'grey') {
      bg = '#2a2a2a';
      surface = '#3a3a3a';
      border = '#555555';
      text = '#f5f5f5';
      textSecondary = 'rgba(255, 255, 255, 0.8)';
      
      if (profile.contrastLevel === 'high') {
        bg = '#1a1a1a';
        surface = '#2a2a2a';
        border = '#666666';
        text = '#ffffff';
      } else if (profile.contrastLevel === 'low') {
        bg = '#353535';
        surface = '#454545';
        border = '#505050';
        text = '#e0e0e0';
      }
    } else if (profile.colorScheme === 'vibrant') {
      bg = '#0a0e1a';
      surface = '#151b2e';
      border = '#2d3f5f';
      text = '#e8f0ff';
      textSecondary = 'rgba(232, 240, 255, 0.75)';
      
      if (profile.contrastLevel === 'high') {
        bg = '#040810';
        surface = '#0d1520';
        border = '#3d5a8f';
        text = '#ffffff';
      } else if (profile.contrastLevel === 'low') {
        bg = '#0f1420';
        surface = '#1a2235';
        border = '#253550';
        text = '#d0dcf0';
      }
    } else { // dark
      bg = '#0f0f0f';
      surface = '#1a1a1a';
      border = '#404040';
      text = '#e0e0e0';
      textSecondary = 'rgba(255, 255, 255, 0.7)';
      
      if (profile.contrastLevel === 'high') {
        bg = '#000';
        surface = '#0d0d0d';
        border = '#666';
        text = '#ffffff';
      } else if (profile.contrastLevel === 'low') {
        bg = '#1a1a1a';
        surface = '#252525';
        border = '#2a2a2a';
        text = '#c0c0c0';
      }
    }
    
    root.style.setProperty('--color-bg', bg);
    root.style.setProperty('--color-surface', surface);
    root.style.setProperty('--color-border', border);
    root.style.setProperty('--color-text', text);
    root.style.setProperty('--color-text-secondary', textSecondary);
    
    // Accent color
    root.style.setProperty('--color-accent', profile.accentColor);
    
    // Motion
    const motionMap = {
      reduced: '0.05s',
      normal: '0.2s',
      enhanced: '0.5s'
    };
    root.style.setProperty('--motion-duration', motionMap[profile.motion]);
    
    // Visual properties
    root.style.setProperty('--focus-ring', `${profile.focusRingThickness}px`);
    root.style.setProperty('--radius', `${profile.borderRadius}px`);
    root.style.setProperty('--shadow-intensity', `${profile.shadowIntensity}`);
    root.style.setProperty('--shadow', `0 2px 8px rgba(0, 0, 0, ${profile.shadowIntensity})`);
    root.style.setProperty('--shadow-lg', `0 4px 16px rgba(0, 0, 0, ${profile.shadowIntensity * 1.5})`);
  };

  return (
    <PersonalizationContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        modelPrediction,
        uiProfile,
        modelStatus,
        runPersonalization,
        isPersonalized,
        applyPresetDirectly
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
}