import * as THREE from "three";
// CHECKED, COMPLETED
export default class Animations {
    constructor(object) {
        this.states = ['animation.robot-runner.idle', 'animation.robot-runner.walk', 'animation.robot-runner.death'];
        this.mixer = new THREE.AnimationMixer(object);
        this.actionInProgress = false;

        this.actions = {};
        for (let i = 0; i < object.animations.length; i++) {
            const clip = object.animations[i];
            const action = this.mixer.clipAction(clip);
            this.actions[clip.name] = action;
            if (this.states.indexOf(clip.name) === 2) {
                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;
            }
        }
        this.resetIdleTime();
        this.activeName = 'animation.robot-runner.idle';
        this.actions[this.activeName].play();
    }

    fadeToAction(name, duration) {
        if (this.activeName != name && !this.actionInProgress) {
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
            if (this.activeName != "Idle") {
                this.resetIdleTime();
            }
        }
    }

    actionFinished() {
        if (this.actionInProgress) {
            this.actionInProgress = false;
            this.mixer.removeEventListener("finished", this.actionInProgress);
        }
    }

    resetIdleTime() {
        this.idleTime = 0.0;
        this.idleTimeLimit = THREE.MathUtils.randFloat(5.0, 10.0);
    }

    updateIdleTime(deltaT) {
        this.idleTime += deltaT;
    }

    idleTimeOut() {
        return this.idleTime > this.idleTimeLimit;
    }

    update(deltaT) {
        if (this.mixer) {
            this.mixer.update(deltaT);
        }
        if (this.activeName === 'animation.robot-runner.idle') {
            this.updateIdleTime(deltaT);
        }
    }
}
