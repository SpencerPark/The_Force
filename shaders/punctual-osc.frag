// Oscillators taken from
// https://github.com/dktr0/Punctual/blob/master/Sound/Punctual/FragmentShader.hs

// phase is 0.0-1.0 and is relative to the period.

float phasor(float f, float phase, float t) {
    return fract(t * f + phase * f);
}

float phasor(float f, float phase) {
    return phasor(f, phase, time);
}

float phasor(float f) {
    return fract(time * f);
}

float sinOsc(float f, float phase, float t) {
    return sin(f * PI2 * t + phase * f * PI2);
}

float sinOsc(float f, float phase) {
    return sinOsc(f, phase, time);
}

float sinOsc(float f) {
    return sinOsc(f, 0.0);
}

float triOsc(float f, float phase, float t) {
    float p = phasor(f, phase, t);
    return p < 0.5 ? p * 4. - 1. : 1. - ((p - 0.5) * 4.);
}

float triOsc(float f, float phase) {
    return triOsc(f, phase, time);
}

float triOsc(float f) {
    return triOsc(f, 0.0);
}

float sawOsc(float f, float phase, float t) {
    return phasor(f, phase, t) * 2. - 1.;
}

float sawOsc(float f, float phase) {
    return sawOsc(f, phase, time);
}

float sawOsc(float f) {
    return sawOsc(f, 0.0);
}

float sqrOsc(float f, float phase, float t) {
    float p = phasor(f, phase, t);
    return p < 0.5 ? -1. : 1.;
}

float sqrOsc(float f, float phase) {
    return sqrOsc(f, phase, time);
}

float sqrOsc(float f) {
    return sqrOsc(f, 0.0);
}