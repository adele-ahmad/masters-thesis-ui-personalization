import * as tf from '@tensorflow/tfjs';
import { UserProfile, ModelPrediction, UIProfile } from '../types/index';

class ModelService {
  private model: tf.GraphModel | null = null;
  private featureColumns: string[] = [];
  private labelEncoders: Record<string, Record<string, number>> = {};
  private status: 'loading' | 'ready' | 'error' = 'loading';

  async initialize(): Promise<void> {
    try {
      // Load model
      this.model = await tf.loadGraphModel('/model/model.json');
      
      // Load feature columns
      const featuresResponse = await fetch('/model/feature_columns.json');
      this.featureColumns = await featuresResponse.json();
      
      // Load label encoders
      const encodersResponse = await fetch('/model/label_encoders.json');
      this.labelEncoders = await encodersResponse.json();
      
      this.status = 'ready';
    } catch (error) {
      console.error('Failed to load model:', error);
      this.status = 'error';
      throw error;
    }
  }

  getStatus(): 'loading' | 'ready' | 'error' {
    return this.status;
  }

  private encodeFeature(featureName: string, value: string | number): number {
    const encoder = this.labelEncoders[featureName];
    if (!encoder) {
      return typeof value === 'number' ? value : 0;
    }
    
    const key = String(value);
    return encoder[key] !== undefined ? encoder[key] : 0;
  }

  private preprocessInput(profile: UserProfile): number[] {
    const input: number[] = [];
    
    // Build input vector according to feature_columns order
    for (const column of this.featureColumns) {
      let value: string | number;
      
      switch (column) {
        case 'Age':
          value = profile.age;
          break;
        case 'Gender':
          value = profile.gender;
          break;
        case 'Platform':
          value = profile.platform;
          break;
        case 'User_experience':
          value = profile.userExperience;
          break;
        case 'Color Scheme':
          value = profile.colorScheme;
          break;
        case 'Visual Hierarchy':
          value = profile.visualHierarchy;
          break;
        case 'Images and Multimedia':
          value = profile.imagesMultimedia;
          break;
        case 'Layout':
          value = profile.layout;
          break;
        case 'Mobile Responsiveness':
          value = profile.mobileResponsiveness;
          break;
        case 'CTA (Call to Action) Buttons':
          value = profile.ctaButtons;
          break;
        case 'Forms and Input Fields':
          value = profile.formsInputFields;
          break;
        case 'Feedback and Error Messages':
          value = profile.feedbackErrorMessages;
          break;
        case 'Loading Speed':
          value = profile.loadingSpeed;
          break;
        case 'Personalization':
          value = profile.personalization;
          break;
        case 'Accessibility':
          value = profile.accessibility;
          break;
        case 'Animation and Transitions':
          value = profile.animationTransitions;
          break;
        case 'Scrolling_Behavior':
          value = profile.scrollingBehavior;
          break;
        case 'Gestures and Touch Controls':
          value = profile.gesturesTouchControls;
          break;
        case 'Search Functionality':
          value = profile.searchFunctionality;
          break;
        case 'Social_Media_Integration':
          value = profile.socialMediaIntegration;
          break;
        default:
          value = 3; // default middle value
      }
      
      input.push(this.encodeFeature(column, value));
    }
    
    return input;
  }

  async predict(profile: UserProfile): Promise<ModelPrediction> {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    const input = this.preprocessInput(profile);
    const inputTensor = tf.tensor2d([input], [1, input.length]);
    
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const probabilities = await prediction.data();
    const classIndex = probabilities.indexOf(Math.max(...Array.from(probabilities)));
    
    inputTensor.dispose();
    prediction.dispose();

    const classNames = ['Low Engagement', 'Medium Engagement', 'High Engagement'];
    
    return {
      classIndex,
      className: classNames[classIndex] || 'Unknown',
      confidence: probabilities[classIndex],
      probabilities: Array.from(probabilities)
    };
  }

  predictionToUIProfile(prediction: ModelPrediction, profile: UserProfile): UIProfile {
   console.log('🤖 MODEL PREDICTION:', prediction);  // ADD THIS LINE
    const { classIndex } = prediction;
    
    // Map prediction to UI characteristics (MORE DRAMATIC CHANGES)
    // Class 0: Low Engagement - Simpler, clearer, LARGE UI, GREY scheme
    // Class 1: Medium Engagement - Balanced UI, DARK scheme
    // Class 2: High Engagement - Rich, detailed, COMPACT UI, VIBRANT scheme
    
    const avgSliderValue = (
      profile.colorScheme +
      profile.visualHierarchy +
      profile.layout +
      profile.accessibility
    ) / 4;

    let typographyBase = 16;
    let typographyScale = 1.2;
    let spacingBase = 8;
    let spacingScale = 1.5;
    let componentDensity: 'compact' | 'normal' | 'spacious' = 'normal';
    let contrastLevel: 'low' | 'medium' | 'high' = 'medium';
    let motion: 'reduced' | 'normal' | 'enhanced' = 'normal';
    let focusRingThickness = 2;
    let borderRadius = 8;
    let shadowIntensity = 0.1;
    let colorScheme: 'dark' | 'grey' | 'vibrant' = 'dark';
    let accentColor = '#4a9eff';

    if (classIndex === 0) {
      // Low Engagement: MUCH LARGER, SIMPLER, high contrast, GREY background
      typographyBase = 20;
      typographyScale = 1.35;
      spacingBase = 16;
      spacingScale = 2.0;
      componentDensity = 'spacious';
      contrastLevel = 'high';
      motion = 'reduced';
      focusRingThickness = 4;
      borderRadius = 16;
      shadowIntensity = 0.02;
      colorScheme = 'grey';  // GREY scheme for accessibility
      accentColor = '#5cb85c';  // Green accent for better visibility
    } else if (classIndex === 1) {
      // Medium Engagement: Balanced, DARK scheme
      typographyBase = 16;
      typographyScale = 1.2;
      spacingBase = 10;
      spacingScale = 1.6;
      componentDensity = 'normal';
      contrastLevel = 'medium';
      motion = 'normal';
      focusRingThickness = 2;
      borderRadius = 8;
      shadowIntensity = 0.1;
      colorScheme = 'dark';  // Standard dark theme
      accentColor = '#4a9eff';  // Blue accent
    } else if (classIndex === 2) {
      // High Engagement: MUCH SMALLER, DENSER, rich details, VIBRANT scheme
      typographyBase = 14;
      typographyScale = 1.1;
      spacingBase = 6;
      spacingScale = 1.3;
      componentDensity = 'compact';
      contrastLevel = avgSliderValue > 4 ? 'high' : 'low';
      motion = profile.animationTransitions >= 4 ? 'enhanced' : 'normal';
      focusRingThickness = 2;
      borderRadius = 4;
      shadowIntensity = 0.2;
      colorScheme = 'vibrant';  // Rich blue-purple theme
      accentColor = '#ff6b9d';  // Pink accent for vibrant look
    }

    // Stronger adjustments based on accessibility slider
    if (profile.accessibility >= 5) {
      focusRingThickness = Math.max(focusRingThickness, 4);
      contrastLevel = 'high';
      typographyBase = Math.max(typographyBase, 18);
    }

    // Stronger adjustments based on animation preference
    if (profile.animationTransitions <= 3) {
      motion = 'reduced';
    } else if (profile.animationTransitions === 5) {
      motion = 'enhanced';
    }

    return {
      typographyBase,
      typographyScale,
      spacingBase,
      spacingScale,
      componentDensity,
      contrastLevel,
      motion,
      focusRingThickness,
      borderRadius,
      shadowIntensity,
      colorScheme,
      accentColor
    };
  }
}

export const modelService = new ModelService();
