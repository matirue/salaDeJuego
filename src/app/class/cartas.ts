//interfaz que contiene toda la información que necesita la tarjeta.
export interface CardData {
    imageId: string;
    state: 'default' | 'flipped' | 'matched';
}