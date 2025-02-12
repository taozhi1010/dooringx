/*
 * @Author: yehuozhili
 * @Date: 2021-05-15 12:49:28
 * @LastEditors: yehuozhili
 * @LastEditTime: 2021-08-27 16:24:39
 * @FilePath: \dooringx\packages\dooringx-example\src\pages\index.tsx
 */
import {
	RightConfig,
	Container,
	useStoreState,
	innerContainerDragUp,
	LeftConfig,
	ContainerWrapper,
	Control,
} from 'dooringx-lib';
import { InsertRowBelowOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { configContext, LocaleContext } from '@/layouts';
import { useCallback } from 'react';
import { PREVIEWSTATE } from '@/constant';
import { Button, Popover } from 'antd';
import { localeKey } from '../../../dooringx-lib/dist/locale';

export const HeaderHeight = '40px';
const footerConfig = function () {
	return (
		<>
			<Popover content={'快捷键'} title={null} trigger="hover">
				<Button type="text" icon={<InsertRowBelowOutlined />}></Button>
			</Popover>
		</>
	);
};

export default function IndexPage() {
	const config = useContext(configContext);
	const locale = useContext(LocaleContext);

	const everyFn = () => {};

	const subscribeFn = useCallback(() => {
		//需要去预览前判断下弹窗。
		localStorage.setItem(PREVIEWSTATE, JSON.stringify(config.getStore().getData()));
	}, [config]);

	const [state] = useStoreState(config, subscribeFn, everyFn);
	return (
		<div {...innerContainerDragUp(config)}>
			<div style={{ height: HeaderHeight }}>
				<Button
					onClick={() => {
						window.open('/iframe');
					}}
				>
					iframe 预览
				</Button>
				<Button
					onClick={() => {
						window.open('/preview');
					}}
				>
					普通预览
				</Button>
				<Button
					onClick={() => {
						locale.change((pre: localeKey) => {
							return pre === 'zh-CN' ? 'en' : 'zh-CN';
						});
					}}
				>
					切换语言
				</Button>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: `calc(100vh - ${HeaderHeight})`,
					width: '100vw',
				}}
			>
				<div style={{ height: '100%' }}>
					<LeftConfig footerConfig={footerConfig()} config={config}></LeftConfig>
				</div>

				<ContainerWrapper config={config}>
					<>
						<Control
							config={config}
							style={{ position: 'fixed', bottom: '160px', right: '450px', zIndex: 100 }}
						></Control>
						<Container state={state} config={config} context="edit"></Container>
					</>
				</ContainerWrapper>
				<div className="rightrender" style={{ height: '100%' }}>
					<RightConfig state={state} config={config}></RightConfig>
				</div>
			</div>
		</div>
	);
}
