// Oscillators taken from
// https://github.com/dktr0/Punctual/blob/master/Sound/Punctual/FragmentShader.hs

float phasor(float f) {
    return (time * f - floor(time * f));
}
float sinOsc(float f) {
    return sin(f * 3.14159265 * 2. * time);
}
float triOsc(float f) {
    float p = phasor(f);
    return p < 0.5 ? p * 4. - 1. : 1. - ((p - 0.5) * 4.);
}
float sawOsc(float f) {
    return phasor(f) * 2. - 1.;
}
float sqrOsc(float f) {
    float p = phasor(f);
    return p < 0.5 ? -1. : 1.;
}
