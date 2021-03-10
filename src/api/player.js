import Axios from './axiosConfig';
// 战队详情-战队队员详情- 队员简介及下拉列表
export async function getPlayerDetailTop(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTDD_PD_NL`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 战队详情-战队队员详情- 数据及比赛列表副本
export async function getPlayerDetail(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTDD_PD`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

