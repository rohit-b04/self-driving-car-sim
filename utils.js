function lerp(A, B, t){ 
    // this lerp function returns the point at a specific coordinate according to the t which is percentage in AB segment
    // this is called linear interpolation
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D) {

    /*
        Ix = Ax+(Bx-Ax)t = Cx+(Dx-Cx)u
        Iy = Ay+(By-Ay)t = Cy+(Dy-Dy)u

        1. Ax+(Bx-Ax)t = Cx+(Dx-Cx)u
            (Ax-Cx)+(Bx-Ax)t = (Dx-Cx)u


        2. Ay+(By-Ay)t = Cy+(Dy-Cy)u
            (Ay-Cy)+(By-Ay)t = (Dy-Cy)u

        After some derivation we get the value of t
        
     */
    const tNumerator=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x)
    const denominator=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y)

    const uNumerator=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y)


    if(denominator != 0) {
        const t = tNumerator/denominator;
        const u = uNumerator/denominator
        if(t >= 0 && t <= 1 && u>=0 && u <= 1) {
            return {
                x:lerp(A.x, B.x,t),
                y:lerp(A.y, B.y, t),
                offset: t
            }
        }
        
    }
    return null

}

function polysIntersect(poly1, poly2) {
    for(let i = 0;i < poly1.length;i++) {
        for(let j = 0;j < poly2.length;j++) {
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch) return true;
        }
    }
    return false;
}

function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}
  