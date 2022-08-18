import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';

import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
import {GITHUB_SITE, SUCCESS, SYSTEM_LOGO} from "@/constant";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  //提交表单
  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      const {userPassword, checkPassword} = values
      // 简单校验
      if (userPassword !== checkPassword) {
        const defaultLoginFailureMessage = '两次输入密码不一致，请重新输入';
        message.error(defaultLoginFailureMessage);
        return;
      }
      // 注册
      const id = await register(values);
      // @ts-ignore
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        history.push(
          {pathname: '/user/login',
            query,
          });
        return;
      }
      //throw new Error(description);
    } catch (error: any) {
      message.error(error.message);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          //为组件的按钮更改文字
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="编程知识星球"
          subTitle={<a href={GITHUB_SITE} target="_blank" rel="noreferrer">最捞的github个人中文站</a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'用户注册'}/>
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    min: 8,
                    required: true,
                    message: '密码长度不小于8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请再次确认密码'}
                rules={[
                  {
                    min: 8,
                    required: true,
                    message: '密码长度不小于8',
                  },
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入星球编号'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
