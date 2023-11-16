import * as THREE from 'three';

export default class Animations {
  constructor(object, animations) {
    this.states = ['animation.robot-runner.idle', 'animation.robot-runner.walk', 'animation.robot-runner.death'];

    this.mixer = new THREE.AnimationMixer(object);
    this.actionInProgress = false;

    this.actions = {};
    for (let i = 0; i < animations.length; i++) {
      const clip = animations[i];
      const action = this.mixer.clipAction(clip);
      this.actions[clip.name] = action;
      if (this.states.indexOf(clip.name) === 2) {
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
      }
    }
    this.activeName = 'animation.robot-runner.idle';
    this.actions[this.activeName].play();
  }

  fadeToAction(name, duration) {
    if (this.activeName !== name && !this.actionInProgress) {
      const previousName = this.activeName;
      this.activeName = name;
      this.actions[previousName].fadeOut(duration);
      this.actions[this.activeName]
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();
      // Some actions must not be interrupted
      if (this.activeName !== 'animation.robot-runner.idle' && this.activeName !== 'animation.robot-runner.walk') {
        this.mixer.addEventListener('finished', event => this.actionFinished(event));
        this.actionInProgress = true;
      }
    }
  }

  actionFinished() {
    if (this.actionInProgress) {
      this.actionInProgress = false;
      this.mixer.removeEventListener('finished', this.actionInProgress);
    }
  }

  update(deltaT) {
    if (this.mixer) {
      this.mixer.update(deltaT);
    }
  }
}
