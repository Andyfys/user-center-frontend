import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {GITHUB_SITE} from "@/constant";

const Footer: React.FC = () => {
  const defaultMessage = 'Andyfys 出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'bilibili',
          title: '哔哩哔哩',
          href: 'https://space.bilibili.com/10397308',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: GITHUB_SITE,
          blankTarget: true,
        },
        {
          key: 'lovlive',
          title: 'Love Live!',
          href: 'https://www.bilibili.com/bangumi/media/md3068',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
