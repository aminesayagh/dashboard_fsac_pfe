// global resources
import React from 'react'


function TextH1(title: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    return function Text({ children, cg }: { children: React.ReactElement<string>, cg: any }) {
        return (
            <>
                    {React.createElement(title, {
                        // className: cg(`title_${title} ${parent == 'card' && 'child_card child_' + card}`, 'text', 'm-0')
                    }, children)}
            </>
        )
    }
}
const Text: { [key: string]: any } = {};
Text.h1 = TextH1('h1');
Text.h2 = TextH1('h2');
Text.h3 = TextH1('h3');
Text.h4 = TextH1('h4');
Text.h5 = TextH1('h5');
Text.h5 = TextH1('h6');


export default Text;