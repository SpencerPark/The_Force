vec2 rectToPolar(vec2 rect) {
    return vec2(sqrt(rect.x*rect.x + rect.y*rect.y), atan(rect.y, rect.x));
}

vec2 polarToRect(vec2 polar) {
    return vec2(polar[0] * cos(polar[1]), polar[0] * sin(polar[1]));
}

// Convert to tile relative coordinates
vec4 tile(vec2 tilesPerUnit, vec2 center) {
    vec2 tileCoords = floor((uv() * tilesPerUnit/2.0) + center);
    vec2 tileRelativeCoords = fract((uv() * tilesPerUnit/2.0) + center);
    return vec4(tileRelativeCoords-0.5, tileCoords);
}

vec4 tile(vec2 tilesPerUnit) {
    return tile(tilesPerUnit, vec2(0.0));
}

vec4 tile(float tilesPerUnit) {
    return tile(vec2(tilesPerUnit));
}

vec4 tileC(vec2 tilesPerUnit) {
    return tile(tilesPerUnit, vec2(0.5));
}

vec4 tileC(float tilesPerUnit) {
    return tileC(vec2(tilesPerUnit));
}

vec4 tileC(vec2 tilesPerUnit, vec2 center) {
    return tile(tilesPerUnit, center + 0.5);
}

float circleTile(vec4 tile, const float width, float feather) {
    feather = abs(feather)/2.0;
    float radius = abs(width)/2.0;
    return 1.0 - smoothstep(radius-feather, radius+feather, distance(tile.xy, vec2(0.0)));
}

float donutTile(vec4 tile, float width, float edgeWidth, float feather) {
    feather = abs(feather)/2.0;
    float radius = abs(width)/2.0;
    float innerRadius = radius - abs(edgeWidth);
    float dist = distance(tile.xy, vec2(0.0));
    return smoothstep(innerRadius-feather, innerRadius+feather, dist) - smoothstep(radius-feather, radius+feather, dist);
}

float boxTile(vec4 tile, float width, float feather) {
    feather = abs(feather)/2.0;
    float radius = abs(width)/2.0;
    vec4 edgeSteps = smoothstep(-radius-feather, -radius+feather, tile.xxyy * vec4(1.0, -1.0, 1.0, -1.0));
    return edgeSteps.x * edgeSteps.y * edgeSteps.z * edgeSteps.w;
}

float triSplitTile(vec4 tile, float feather) {
    feather = abs(feather)/2.0;
    return smoothstep(-feather, feather, tile.x + tile.y);
}

float regPolyTile(vec4 tile, int sides, float width, float feather) {
    feather = abs(feather)/2.0;
    float radius = abs(width)/2.0;
    vec2 polar = rectToPolar(tile.xy);
    float wedgeAngle = PI2 / float(sides);
    
    float wedgeStart = floor(polar[1] / wedgeAngle)*wedgeAngle;
    float wedgeEnd = wedgeStart + wedgeAngle;
    vec2 lineStart = polarToRect(vec2(radius, wedgeStart));
    vec2 lineEnd = polarToRect(vec2(radius, wedgeEnd));
    
    vec2 a = tile.xy - lineStart;
    vec2 b = lineEnd - lineStart;
    // TODO this feather is not scaled correctly...
    return smoothstep(b.y*a.x-feather, b.y*a.x+feather, b.x*a.y);
}

float hexTile(vec4 tile, float width, float feather) {
    return regPolyTile(tile, 6, width, feather);
}

float truchetTile(vec4 tile, float edgeWidth, float feather) {
    feather = abs(feather)/2.0;
    float radius = (1.0 + abs(edgeWidth))/2.0;
    float innerRadius = radius - abs(edgeWidth);
    float dist = distance(tile.xy, vec2(-0.5, 0.5));
    float seg = smoothstep(innerRadius-feather, innerRadius+feather, dist) - smoothstep(radius-feather, radius+feather, dist);
    dist = distance(tile.xy, vec2(0.5, -0.5));
    return seg + smoothstep(innerRadius-feather, innerRadius+feather, dist) - smoothstep(radius-feather, radius+feather, dist);
}

vec4 rotateTile(vec4 tile, float percentage) {
    vec2 polar = rectToPolar(tile.xy);
    return vec4(polarToRect(vec2(polar[0], polar[1] + (percentage*PI2))), tile.zw);
}

vec4 translateTileContents(vec4 tile, vec2 translation) {
    return vec4(tile.xy+translation, tile.zw);
}

vec4 withCenteredCoords(vec4 tile, vec2 center) {
    return vec4(tile.xy, abs(tile.zw)+center);
}
vec4 withCenteredCoords(vec4 tile, float center) {
    return withCenteredCoords(tile, vec2(center));
}
vec4 withCenteredCoords(vec4 tile) {
    return withCenteredCoords(tile, 0.0);
}