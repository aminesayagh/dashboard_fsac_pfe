import { t } from 'i18next';

const trans = (path: string) => (content: string, params: object = {}): string => {
    return t(`${path}.${content}`, params) || '';
}

export default trans;