import Axios from './axiosConfig';
export async function getGroupData(data) {
	try {
		const result = await Axios.request({
			url: `/IFGetModelGroupData`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取比赛列表数据
export async function getMatchList(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIMatch`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取比赛详情-1顶部数据
export async function getMatchDetailsTop(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIDetailsTop`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取比赛详情-2直播数据 By FeikeQ
export async function getMatchDetailsLiveVideo(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUILiveVideo`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取比赛详情-4阵容 By FeikeQ
// export async function getMatchDetailsBattleArray(data) {
// 	try {
// 		const result = await Axios.request({
// 			url: `/IFAppUIBattleArray`,
// 			method: 'post',
// 			data
// 		})
// 		return result
// 	} catch (e) {
// 		throw e
// 	}
// }

//获取比赛详情阵容 纳米电竞
export async function getMatchDetailsBattleArray(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIBattleArrayNM`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}


//获取比赛详情选手数据
export async function getMatchDetailPlayerInfo(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIPlayerInfo`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取比赛详情分析数据
export async function getMatchDetailAnalyse(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIAnalyse`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取csgo地图数据 /IFAppUIMap
export async function geIFAppUIMap(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIMap`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取联赛列表
export async function getIFAppUITournamentList (data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUITournamentList`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 战队列表
export async function getIFAppUIBattleTeamList (data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIBattleTeamList`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}


