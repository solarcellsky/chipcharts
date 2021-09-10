import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const year = new Date().getFullYear();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '上海孤波',
  });

  return <DefaultFooter copyright={`${year} ${defaultMessage}`} links={[]} />;
};
