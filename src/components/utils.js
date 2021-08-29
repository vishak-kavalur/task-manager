
// Util to generate consistent background color for avatar
export const stringToHslColor = (str, saturation=35, lightness=45) =>  {
    var hash = 0;
    if(!str){
        stringToHslColor("--");
        return;
    } 
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let hue = hash % 360;
    return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
}