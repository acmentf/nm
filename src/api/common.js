import Axios from './axiosConfig';

// 获取系统时间 IFGetTime

export async function getSystemTime(data) {
	try {
		const result = await Axios.request({
			url: `IFGetTime`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取验证码
export async function getCode(data) {
	try {
		const result = await Axios.request({
			url: `IFAppSMSGetCode`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//校验验证码
export async function checkCode(data) {
	try {
		const result = await Axios.request({
			url: `IFAppSMSCheckCode`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 获取公共信息
export async function getPublicData(data) {
	try {
		const result = await Axios.request({
			url: `IFAppGameData`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 关注 条件/取消 
export async function toggleFoucs(data) {
	try {
		const result = await Axios.request({
			url: `/UserCenter/IFAppUserCenterSetFocus`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}


