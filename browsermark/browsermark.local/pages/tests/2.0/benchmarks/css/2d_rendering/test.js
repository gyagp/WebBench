/**
 * CSS 2D Transform
 *
 * Test browser capability of rendering object in 2D. Script will create matrixes like (0, 0, 0, 0, 0, 0) which will be used to
 * transform image in 2D. After each step script will look image top left corner, and if it position has changed more than
 * one pixel, counter is increased.
 *
 * To determine internal score, script will use operations/second (ops): counter / elapsed time in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).
 *
 * @version 2.0
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : false,
    operations : 0,
    time : 0,
    internalCounter : false,
    testName : 'CSS 2D Transform',
    testVersion : '2.0',
    compareScore : 13.7,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

// Position measurement object to ensure that position has changed before increasing counter
var oldPosition = {};

// Debug data storage for debugging situations
var debugData = {
    round : []
};

// Debug data variables
oldCount = 0;
oldElapsed = 0;
oldMatrix = 'none';
lowestScore = 0;
highestScore = 0;

var test = {
    init : function()
    {
        /*
         * transform: A jQuery cssHooks adding cross-browser 2d transform capabilities to $.fn.css() and $.fn.animate()
         *
         * limitations:
         * - requires jQuery 1.4.3+
         * - Should you use the *translate* property, then your elements need to be absolutely positionned in a relatively positionned wrapper **or it will fail in IE678**.
         * - transformOrigin is not accessible
         *
         * latest version and complete README available on Github:
         * https://github.com/louisremi/jquery.transform.js
         *
         * Copyright 2011 @louis_remi
         * Licensed under the MIT license.
         *
         * This saved you an hour of work?
         * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
         *
         */
        //(function(j,m,s,o,k){var q=s.createElement("div"),g=q.style,c="Transform",z=["O"+c,"ms"+c,"Webkit"+c,"Moz"+c],w=z.length,a,h,D="Float32Array" in m,G,t,C=/Matrix([^)]*)/,n=/^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,F="transform",H="transformOrigin",E="translate",e="rotate",p="scale",y="skew",b="matrix";while(w--){if(z[w] in g){j.support[F]=a=z[w];j.support[H]=a+"Origin";continue}}if(!a){j.support.matrixFilter=h=g.filter===""}j.cssNumber[F]=j.cssNumber[H]=true;if(a&&a!=F){j.cssProps[F]=a;j.cssProps[H]=a+"Origin";if(a=="Moz"+c){G={get:function(I,i){return(i?j.css(I,a).split("px").join(""):I.style[a])},set:function(i,I){i.style[a]=/matrix\([^)p]*\)/.test(I)?I.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,b+"$1$2px,$3px"):I}}}else{if(/^1\.[0-5](?:\.|$)/.test(j.fn.jquery)){G={get:function(I,i){return(i?j.css(I,a.replace(/^ms/,"Ms")):I.style[a])}}}}}else{if(h){G={get:function(L,K,i){var J=(K&&L.currentStyle?L.currentStyle:L.style),I,M;if(J&&C.test(J.filter)){I=RegExp.$1.split(",");I=[I[0].split("=")[1],I[2].split("=")[1],I[1].split("=")[1],I[3].split("=")[1]]}else{I=[1,0,0,1]}if(!j.cssHooks[H]){I[4]=J?parseInt(J.left,10)||0:0;I[5]=J?parseInt(J.top,10)||0:0}else{M=j._data(L,"transformTranslate",k);I[4]=M?M[0]:0;I[5]=M?M[1]:0}return i?I:b+"("+I+")"},set:function(N,O,J){var I=N.style,K,i,M,L;if(!J){I.zoom=1}O=v(O);i=["Matrix(M11="+O[0],"M12="+O[2],"M21="+O[1],"M22="+O[3],"SizingMethod='auto expand'"].join();M=(K=N.currentStyle)&&K.filter||I.filter||"";I.filter=C.test(M)?M.replace(C,i):M+" progid:DXImageTransform.Microsoft."+i+")";if(!j.cssHooks[H]){if((L=j.transform.centerOrigin)){I[L=="margin"?"marginLeft":"left"]=-(N.offsetWidth/2)+(N.clientWidth/2)+"px";I[L=="margin"?"marginTop":"top"]=-(N.offsetHeight/2)+(N.clientHeight/2)+"px"}I.left=O[4]+"px";I.top=O[5]+"px"}else{j.cssHooks[H].set(N,O)}}}}}if(G){j.cssHooks[F]=G}t=G&&G.get||j.css;j.fx.step.transform=function(M){var L=M.elem,J=M.start,N=M.end,R=M.pos,K="",P=100000,O,I,Q,S;if(!J||typeof J==="string"){if(!J){J=t(L,a)}if(h){L.style.zoom=1}N=N.split("+=").join(J);j.extend(M,d(J,N));J=M.start;N=M.end}O=J.length;while(O--){I=J[O];Q=N[O];S=+false;switch(I[0]){case E:S="px";case p:S||(S=" ");K=I[0]+"("+o.round((I[1][0]+(Q[1][0]-I[1][0])*R)*P)/P+S+","+o.round((I[1][1]+(Q[1][1]-I[1][1])*R)*P)/P+S+")"+K;break;case y+"X":case y+"Y":case e:K=I[0]+"("+o.round((I[1]+(Q[1]-I[1])*R)*P)/P+"rad)"+K;break}}M.origin&&(K=M.origin+K);G&&G.set?G.set(L,K,+true):L.style[a]=K};function v(K){K=K.split(")");var L=j.trim,O=-1,N=K.length-1,Q,I,J,M=D?new Float32Array(6):[],R=D?new Float32Array(6):[],P=D?new Float32Array(6):[1,0,0,1,0,0];M[0]=M[3]=P[0]=P[3]=1;M[1]=M[2]=M[4]=M[5]=0;while(++O<N){Q=K[O].split("(");I=L(Q[0]);J=Q[1];R[0]=R[3]=1;R[1]=R[2]=R[4]=R[5]=0;switch(I){case E+"X":R[4]=parseInt(J,10);break;case E+"Y":R[5]=parseInt(J,10);break;case E:J=J.split(",");R[4]=parseInt(J[0],10);R[5]=parseInt(J[1]||0,10);break;case e:J=f(J);R[0]=o.cos(J);R[1]=o.sin(J);R[2]=-o.sin(J);R[3]=o.cos(J);break;case p+"X":R[0]=+J;break;case p+"Y":R[3]=J;break;case p:J=J.split(",");R[0]=J[0];R[3]=J.length>1?J[1]:J[0];break;case y+"X":R[2]=o.tan(f(J));break;case y+"Y":R[1]=o.tan(f(J));break;case b:J=J.split(",");R[0]=J[0];R[1]=J[1];R[2]=J[2];R[3]=J[3];R[4]=parseInt(J[4],10);R[5]=parseInt(J[5],10);break}P[0]=M[0]*R[0]+M[2]*R[1];P[1]=M[1]*R[0]+M[3]*R[1];P[2]=M[0]*R[2]+M[2]*R[3];P[3]=M[1]*R[2]+M[3]*R[3];P[4]=M[0]*R[4]+M[2]*R[5]+M[4];P[5]=M[1]*R[4]+M[3]*R[5]+M[5];M=[P[0],P[1],P[2],P[3],P[4],P[5]]}return P}function r(K){var L,J,I,i=K[0],O=K[1],N=K[2],M=K[3];if(i*M-O*N){L=o.sqrt(i*i+O*O);i/=L;O/=L;I=i*N+O*M;N-=i*I;M-=O*I;J=o.sqrt(N*N+M*M);N/=J;M/=J;I/=J;if(i*M<O*N){i=-i;O=-O;I=-I;L=-L}}else{L=J=I=0}return[[E,[+K[4],+K[5]]],[e,o.atan2(O,i)],[y+"X",o.atan(I)],[p,[L,J]]]}function d(P,J){var M={start:[],end:[]},K=-1,I,L,N,O;(P=="none"||B(P))&&(P="");(J=="none"||B(J))&&(J="");if(P&&J&&!J.indexOf("matrix")&&u(P).join()==u(J.split(")")[0]).join()){M.origin=P;P="";J=J.slice(J.indexOf(")")+1)}if(!P&&!J){return}if(!P||!J||x(P)==x(J)){P&&(P=P.split(")"))&&(I=P.length);J&&(J=J.split(")"))&&(I=J.length);while(++K<I-1){P[K]&&(L=P[K].split("("));J[K]&&(N=J[K].split("("));O=j.trim((L||N)[0]);A(M.start,l(O,L?L[1]:0));A(M.end,l(O,N?N[1]:0))}}else{M.start=r(v(P));M.end=r(v(J))}return M}function l(K,L){var I=+(!K.indexOf(p)),J,i=K.replace(/e[XY]/,"e");switch(K){case E+"Y":case p+"Y":L=[I,L?parseFloat(L):I];break;case E+"X":case E:case p+"X":J=1;case p:L=L?(L=L.split(","))&&[parseFloat(L[0]),parseFloat(L.length>1?L[1]:K==p?J||L[0]:I+"")]:[I,I];break;case y+"X":case y+"Y":case e:L=L?f(L):0;break;case b:return r(L?u(L):[1,0,0,1,0,0]);break}return[[i,L]]}function B(i){return n.test(i)}function x(i){return i.replace(/(?:\([^)]*\))|\s/g,"")}function A(I,i,J){while(J=i.shift()){I.push(J)}}function f(i){return ~i.indexOf("deg")?parseInt(i,10)*(o.PI*2/360):~i.indexOf("grad")?parseInt(i,10)*(o.PI/200):parseFloat(i)}function u(i){i=/([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(i);return[i[1],i[2],i[3],i[4],i[5],i[6]]}j.transform={centerOrigin:"margin"}})(jQuery,window,document,Math);
        (function(a,b,c,d,e){function y(b){b=b.split(")");var c=a.trim,e=-1,f=b.length-1,g,h,i,j=m?new Float32Array(6):[],k=m?new Float32Array(6):[],l=m?new Float32Array(6):[1,0,0,1,0,0];j[0]=j[3]=l[0]=l[3]=1;j[1]=j[2]=j[4]=j[5]=0;while(++e<f){g=b[e].split("(");h=c(g[0]);i=g[1];k[0]=k[3]=1;k[1]=k[2]=k[4]=k[5]=0;switch(h){case t+"X":k[4]=parseInt(i,10);break;case t+"Y":k[5]=parseInt(i,10);break;case t:i=i.split(",");k[4]=parseInt(i[0],10);k[5]=parseInt(i[1]||0,10);break;case u:i=F(i);k[0]=d.cos(i);k[1]=d.sin(i);k[2]=-d.sin(i);k[3]=d.cos(i);break;case v+"X":k[0]=+i;break;case v+"Y":k[3]=i;break;case v:i=i.split(",");k[0]=i[0];k[3]=i.length>1?i[1]:i[0];break;case w+"X":k[2]=d.tan(F(i));break;case w+"Y":k[1]=d.tan(F(i));break;case x:i=i.split(",");k[0]=i[0];k[1]=i[1];k[2]=i[2];k[3]=i[3];k[4]=parseInt(i[4],10);k[5]=parseInt(i[5],10);break}l[0]=j[0]*k[0]+j[2]*k[1];l[1]=j[1]*k[0]+j[3]*k[1];l[2]=j[0]*k[2]+j[2]*k[3];l[3]=j[1]*k[2]+j[3]*k[3];l[4]=j[0]*k[4]+j[2]*k[5]+j[4];l[5]=j[1]*k[4]+j[3]*k[5]+j[5];j=[l[0],l[1],l[2],l[3],l[4],l[5]]}return l}function z(a){var b,c,e,f=a[0],g=a[1],h=a[2],i=a[3];if(f*i-g*h){b=d.sqrt(f*f+g*g);f/=b;g/=b;e=f*h+g*i;h-=f*e;i-=g*e;c=d.sqrt(h*h+i*i);h/=c;i/=c;e/=c;if(f*i<g*h){f=-f;g=-g;e=-e;b=-b}}else{b=c=e=0}return[[t,[+a[4],+a[5]]],[u,d.atan2(g,f)],[w+"X",d.atan(e)],[v,[b,c]]]}function A(b,c){var d={start:[],end:[]},e=-1,f,g,h,i;(b=="none"||C(b))&&(b="");(c=="none"||C(c))&&(c="");if(b&&c&&!c.indexOf("matrix")&&G(b).join()==G(c.split(")")[0]).join()){d.origin=b;b="";c=c.slice(c.indexOf(")")+1)}if(!b&&!c){return}if(!b||!c||D(b)==D(c)){b&&(b=b.split(")"))&&(f=b.length);c&&(c=c.split(")"))&&(f=c.length);while(++e<f-1){b[e]&&(g=b[e].split("("));c[e]&&(h=c[e].split("("));i=a.trim((g||h)[0]);E(d.start,B(i,g?g[1]:0));E(d.end,B(i,h?h[1]:0))}}else{d.start=z(y(b));d.end=z(y(c))}return d}function B(a,b){var c=+!a.indexOf(v),d,e=a.replace(/e[XY]/,"e");switch(a){case t+"Y":case v+"Y":b=[c,b?parseFloat(b):c];break;case t+"X":case t:case v+"X":d=1;case v:b=b?(b=b.split(","))&&[parseFloat(b[0]),parseFloat(b.length>1?b[1]:a==v?d||b[0]:c+"")]:[c,c];break;case w+"X":case w+"Y":case u:b=b?F(b):0;break;case x:return z(b?G(b):[1,0,0,1,0,0]);break}return[[e,b]]}function C(a){return q.test(a)}function D(a){return a.replace(/(?:\([^)]*\))|\s/g,"")}function E(a,b,c){while(c=b.shift()){a.push(c)}}function F(a){return~a.indexOf("deg")?parseInt(a,10)*(d.PI*2/360):~a.indexOf("grad")?parseInt(a,10)*(d.PI/200):parseFloat(a)}function G(a){a=/([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(a);return[a[1],a[2],a[3],a[4],a[5],a[6]]}var f=c.createElement("div"),g=f.style,h="Transform",i=["O"+h,"ms"+h,"Webkit"+h,"Moz"+h],j=i.length,k,l,m="Float32Array"in b,n,o,p=/Matrix([^)]*)/,q=/^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,r="transform",s="transformOrigin",t="translate",u="rotate",v="scale",w="skew",x="matrix";while(j--){if(i[j]in g){a.support[r]=k=i[j];a.support[s]=k+"Origin";continue}}if(!k){a.support.matrixFilter=l=g.filter===""}a.cssNumber[r]=a.cssNumber[s]=true;if(k&&k!=r){a.cssProps[r]=k;a.cssProps[s]=k+"Origin";if(k=="Moz"+h){n={get:function(b,c){return c?a.css(b,k).split("px").join(""):b.style[k]},set:function(a,b){a.style[k]=/matrix\([^)p]*\)/.test(b)?b.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,x+"$1$2px,$3px"):b}}}else if(/^1\.[0-5](?:\.|$)/.test(a.fn.jquery)){n={get:function(b,c){return c?a.css(b,k.replace(/^ms/,"Ms")):b.style[k]}}}}else if(l){n={get:function(b,c,d){var f=c&&b.currentStyle?b.currentStyle:b.style,g,h;if(f&&p.test(f.filter)){g=RegExp.$1.split(",");g=[g[0].split("=")[1],g[2].split("=")[1],g[1].split("=")[1],g[3].split("=")[1]]}else{g=[1,0,0,1]}if(!a.cssHooks[s]){g[4]=f?parseInt(f.left,10)||0:0;g[5]=f?parseInt(f.top,10)||0:0}else{h=a._data(b,"transformTranslate",e);g[4]=h?h[0]:0;g[5]=h?h[1]:0}return d?g:x+"("+g+")"},set:function(b,c,d){var e=b.style,f,g,h,i;if(!d){e.zoom=1}c=y(c);g=["Matrix("+"M11="+c[0],"M12="+c[2],"M21="+c[1],"M22="+c[3],"SizingMethod='auto expand'"].join();h=(f=b.currentStyle)&&f.filter||e.filter||"";e.filter=p.test(h)?h.replace(p,g):h+" progid:DXImageTransform.Microsoft."+g+")";if(!a.cssHooks[s]){if(i=a.transform.centerOrigin){e[i=="margin"?"marginLeft":"left"]=-(b.offsetWidth/2)+b.clientWidth/2+"px";e[i=="margin"?"marginTop":"top"]=-(b.offsetHeight/2)+b.clientHeight/2+"px"}e.left=c[4]+"px";e.top=c[5]+"px"}else{a.cssHooks[s].set(b,c)}}}}if(n){a.cssHooks[r]=n}o=n&&n.get||a.css;a.fx.step.transform=function(b){var c=b.elem,e=b.start,f=b.end,g=b.pos,h="",i=1e5,j,m,p,q;if(!e||typeof e==="string"){if(!e){e=o(c,k)}if(l){c.style.zoom=1}f=f.split("+=").join(e);a.extend(b,A(e,f));e=b.start;f=b.end}j=e.length;while(j--){m=e[j];p=f[j];q=+false;switch(m[0]){case t:q="px";case v:q||(q="");h=m[0]+"("+d.round((m[1][0]+(p[1][0]-m[1][0])*g)*i)/i+q+","+d.round((m[1][1]+(p[1][1]-m[1][1])*g)*i)/i+q+")"+h;break;case w+"X":case w+"Y":case u:h=m[0]+"("+d.round((m[1]+(p[1]-m[1])*g)*i)/i+"rad)"+h;break}}b.origin&&(h=b.origin+h);n&&n.set?n.set(c,h,+true):c.style[k]=h};a.transform={centerOrigin:"margin"}})(jQuery,window,document,Math);

        // Save test but not asynchronous, before continue test must be saved to prevent mismatch error
        $.ajax(
        {
            url: '/ajax/set_test',
            async: false,
            type: 'POST',
            data:
            {
                test_name: guide.testName,
                test_version: guide.testVersion
            }
        });

        // Set up go permission if browser support CSS 2D Transform
        if (Modernizr.csstransforms)
        {
            // 47 operations should run approximately 15 seconds
            guide.operations = 47;
            // Test have no time limit since test is doing asynchronous operations
            guide.time = null;
            // Counting is done internally (in this test)
            guide.internalCounter = true;
            // Browser supports transform, give permission to run this test
            guide.isDoable = true;
        }
        return guide;
    },
    run : function(isFinal, loopCount)
    {
        // Create matrix of six values
        var matrix = '';
        for (i=0;i<6;i++)
        {
            randFloat = mathExtended.randFloat();
            if (Math.abs(randFloat) == randFloat)
            {
                randFloat = randFloat - Math.floor(randFloat);
            }
            else
            {
                randFloat = randFloat - Math.floor(randFloat) - 1;
            }
            randFloat = mathExtended.roundFloat(randFloat, 3);
            matrix = matrix + randFloat + ', ';
        }

        // Remove last comma and space from matrix
        matrix = matrix.substring(0, matrix.length-2);

        // Set up internal clock to measure speed
        var d = new Date();
        internalStart = d.getTime();

        // Set up new matrix, if call is final call, transform element back to normal
        var newMatrix = 'matrix(' + matrix + ')';
        if (isFinal)
        {
            newMatrix = 'none';
        }

        //Set old position before transform
        oldPosition = $('img#transform_this').offset();

        // Start animation
        $('img#transform_this').animate(
        {
            // transform: matrix(?, ?, ?, ?, ?, ?)
            transform: newMatrix,
            msTransform: newMatrix
        },{
            // Animation duration is 0.3 seconds
            duration: 300,
            // Increase counter by +1 on each step after ensuring that element top left corner position has changed
            step: function()
            {
                if (Math.round(oldPosition.top) != Math.round($(this).position().top) || Math.round(oldPosition.left) != Math.round($(this).position().left))
                {
                    benchmark.increaseCounter();
                    oldPosition = $(this).position();
                }
            },
            complete: function ()
            {
                // Every time animation is completed, measure internal time for debugging purposes
                var internalElapsed = d.getTime() - internalStart;
                benchmark.increaseElapsedTime(internalElapsed);
                var elapsed = benchmark.elapsedTime();

                // When run is final run and animation is completed, we need to send results via ajax for resultsHandler and set up debug data (if necessary)
                if (isFinal)
                {

                    // Final score is 0 by default
                    var finalScore = 0;

                    // Ensure that counter is not zero to avoid division by zero -error
                    if (counter != 0)
                    {
                        // Update final score
                        finalScore = counter / elapsed * 1000;

                        // Set final round debug data
                        debugData.round[loopCount] = [
                            'Round ' + (loopCount + 1),
                            'From ' + oldMatrix + ' to ' + newMatrix,
                            'Elapsed time: ' + (elapsed - oldElapsed) + ' microseconds',
                            'Operations: ' + (counter - oldCount) + ' pcs',
                            'Operations per second: ' + ((counter - oldCount) / (elapsed - oldElapsed) * 1000)
                        ];

                        // Set overall score debug data
                        debugData.elapsedTime = elapsed;
                        debugData.operations = counter;
                        debugData.ops = finalScore;
                    }
                    // counter == 0
                    else
                    {
                        // Set final round debug data
                        debugData.round[loopCount] = [
                            'Round ' + (loopCount + 1),
                            'From ' + oldMatrix + ' to ' + newMatrix,
                            'Elapsed time: ' + (elapsed - oldElapsed) + ' microseconds',
                            'Operations: 0 pcs',
                            'Operations per second: 0'
                        ];

                        // Set overall score debug data
                        debugData.elapsedTime = elapsed;
                        debugData.operations = 0;
                        debugData.ops = 0;
                    }

                    // Send score via benchmark.submitResult
                    benchmark.submitResult(finalScore, guide, debugData);

                    // If debugging, send data to benchmark.logger which will handle data output
                    if (debug == true)
                    {
                        benchmark.logger(debugData);
                    }
                }
                // Not a final round, add some debug data
                else
                {
                    // Ensure that counter is not zero to avoid division by zero -error
                    if (counter != 0)
                    {
                        // Set current round debug data
                        score = ((counter - oldCount) / (elapsed - oldElapsed) * 1000);
                        debugData.round[loopCount] = [
                            'Round ' + (loopCount + 1),
                            'From ' + oldMatrix + ' to ' + newMatrix,
                            'Elapsed time: ' + (elapsed - oldElapsed) + ' microseconds',
                            'Operations: ' + (counter - oldCount) + ' pcs',
                            'Operations per second: ' + score
                        ];

                        // Update old values to new ones
                        oldCount = counter;
                        oldElapsed = elapsed;
                        oldMatrix = newMatrix;

                        // If we had new lowest score, update it
                        if (lowestScore == 0 || lowestScore > score)
                        {
                            lowestScore = score;
                        }

                        // If we had new highest score, update it
                        if (highestScore == 0 || highestScore < score)
                        {
                            highestScore = score;
                        }
                    }
                    // counter == 0
                    else
                    {
                        // current round debug data: 0 points
                        debugData.round[loopCount] = [
                            'Round ' + (loopCount + 1),
                            'From ' + oldMatrix + ' to ' + newMatrix,
                            'Elapsed time: ' + (elapsed - oldElapsed) + ' microseconds',
                            'Operations: 0 pcs',
                            'Operations per second: 0'
                        ];
                    }
                }
            }
        });
    }
};