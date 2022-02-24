import common from 'asset/locales/en/common.json';

const literalString = { ...common };

type LiteralStringKey = keyof typeof literalString | '' | ' ';
export default LiteralStringKey;
