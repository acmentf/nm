import Axios from './axiosConfig';
// 战队详情-顶部 战队简讯
export async function getTeamDetailTop(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTD_NL`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//战队详情-资料页面
export async function getTeamDetailResource(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTD_Resource`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 赛事荣誉
export async function getTeamDetailHonor(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTDD_Honor`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//战队详情-数据页面 
export async function getTeamDataDetail(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTD_Data`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//战队详情-数据页面-成员及下拉列表 
export async function getTeamSelectList(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTD_Data_MOL`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//比赛列表数据
export async function getMatchList(data) {
	try {
		const result = await Axios.request({
			url: `IFAppUI_BTD_Match3`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}