import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { animations } from './animations';
// style
import './Card.module.scss';

// import { classAdd as cg } from '@/helpers/ClassNameCreator';
import StyleNameCaretaker from '@/helpers/ClassNameCreator';
import CardStyle from './Card.module.scss';
const cg = StyleNameCaretaker(CardStyle);

import { Card as CardNext, Col as ColNextUi, Row as RowNextUi, Grid as GridNextUi } from '@nextui-org/react';

import { PropsCard, IHeader, IBody, IFooter, ICol, IRow, AnimationNames, IGrid, IGridContainer } from './cardType';
import { MessageContext, CardContext } from '@/components/commun/CommunProvider';

export const Header = ({ children }: IHeader) => {
    return (
        <>
            <CardContext.Consumer>
                {({ size, provider }) => (<CardNext.Header {...cg('header', [['size', size]])}>
                    {children}
                </CardNext.Header>)}
            </CardContext.Consumer>
        </>
    )
}

export const Body = ({ children, ...props }: IBody) => {
    return (
        <>
            <CardContext.Consumer>
                {({ size, provider }) => (
                    <CardNext.Body {...props} {...cg('body', [['size', size]])}>
                        {children}
                    </CardNext.Body>
                )}
            </CardContext.Consumer>
        </>
    )
}

export const Footer = ({ children,className, ...props }: IFooter) => {
    return (
        <>
            <CardContext.Consumer>
                {({ size, provider }) => (
                    <CardNext.Footer {...props} {...cg('footer', [['size', size]])}>
                        {children}
                    </CardNext.Footer>
                )}
            </CardContext.Consumer>
        </>
    )
}

export const Grid = ({ children, ...props }: IGrid) => {
    return (
        <><GridNextUi {...cg('grid')} {...props}>
            {children}
        </GridNextUi></>
    )
}

Grid.Container = ({ children, ...props }: IGridContainer) => {
    return (
        <>
            <GridNextUi.Container  {...props}>
                {children}
            </GridNextUi.Container>
        </>
    )
} 

export const Col = ({ align = 'start', children, ...props }: ICol) => {
    return (
        <><ColNextUi {...cg('col', [['align', align]])} {...props} >{children}</ColNextUi></>
    )
}
export const Row = ({ children, ...props }: IRow) => {
    return (
        <><RowNextUi {...cg('row')} {...props} >{children}</RowNextUi></>
    )
}

// card card_style_bordered 
const cssByVariant = {
    bordered: {
    },
    shadow: {
        border: 'none',
        shadow: '$xs',
        dropShadow: '$md'
    },
    flat: {
        border: 'none'
    },
    none: {
        border: 'none',
        shadow: 'none',
        dropShadow: 'none'
    }
}
const animationProps = (animationName: AnimationNames | undefined) => {
    if (!animationName) return {};
    return animations[animationName];
}


const sizeCss = {
    md: {
        paddingBottom: '2rem',
        paddingTop: '2rem',
    },
    xs: {},
    xl: {

    }
}
const Card = ({ active = true, css, size = 'xs', width= 'full', children, ...props }: PropsCard) => {
    return (
        <>
            {
                <MessageContext.Consumer >
                    {({ message, provider }) => (
                        <AnimatePresence>
                            {active && <motion.div className={`w-${width}`} {...animationProps(props.animation)} >
                                <CardNext
                                    {...props}
                                    css={{ ...css, ...cssByVariant[props.variant || 'none'], ...sizeCss[size] }}
                                    variant={props.variant}
                                    {...cg('card', [['message', message], ['size', size]])}
                                >
                                    <CardContext.Provider value={{ provider: 'card', size: size }} >
                                        {children}
                                    </CardContext.Provider>
                                </CardNext>
                            </motion.div>}
                        </AnimatePresence>
                    )}
                </MessageContext.Consumer>
            }
        </>
    )
}

Card.Body = Body;
Card.Header = Header;
Card.Footer = Footer;
Card.Image = CardNext.Image
export default Card;