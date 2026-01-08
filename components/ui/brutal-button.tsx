import React from 'react';
import { BrutalPressable, BrutalPressableProps } from './brutal-pressable';

export type BrutalButtonProps = BrutalPressableProps;

/**
 * A themed button component with Neobrutalist styling.
 * Now a wrapper around BrutalPressable for consistent animation logic.
 */
export const BrutalButton = (props: BrutalButtonProps) => {
    return <BrutalPressable {...props} />;
};

