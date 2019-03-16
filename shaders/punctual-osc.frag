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

// Standing variants, with s prefix

float sSinOsc(float f, float phase, float t) {
    return sinOsc(f, phase, t)*0.5 + sinOsc(f, -phase, t)*0.5;
}

float sSinOsc(float f, float phase) {
    return sSinOsc(f, phase, time);
}

float sSinOsc(float f) {
    return sSinOsc(f, 0.0);
}

float sTriOsc(float f, float phase, float t) {
    return triOsc(f, phase, t)*0.5 + triOsc(f, -phase, t);
}

float sTriOsc(float f, float phase) {
    return sTriOsc(f, phase, time);
}

float sTriOsc(float f) {
    return sTriOsc(f, 0.0);
}

float sSawOsc(float f, float phase, float t) {
    return sawOsc(f, phase, t)*0.5 + sawOsc(f, -phase, t);
}

float sSawOsc(float f, float phase) {
    return sSawOsc(f, phase, time);
}

float sSawOsc(float f) {
    return sSawOsc(f, 0.0);
}

float sSqrOsc(float f, float phase, float t) {
    return sqrOsc(f, phase, t)*0.5 + sqrOsc(f, -phase, t);
}

float sSqrOsc(float f, float phase) {
    return sSqrOsc(f, phase, time);
}

float sSqrOsc(float f) {
    return sSqrOsc(f, 0.0);
}