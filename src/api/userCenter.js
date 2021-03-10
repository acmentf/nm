import Axios from './axiosConfig';

//登录/注册 
export async function Login(data) {
	try {
		const result = await Axios.request({
			url: `/UserCenter/IFLogin`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//忘记密码 修改密码提交 
export async function forgetPwd(data) {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFAppUserCenterForgetPass`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取用户信息 
export async function getUserInfo(data) {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFAppGetUserInfo`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}


//修改 用户信息（头像，昵称）
export async function setUserInfo(data) {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFAppModifyUserInfo`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//修改用户手机号码 
export async function updatePhone(data) {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFAppUserCenterModifyPhone`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}
//修改用户密码
export async function updatePwd(data) {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFAppUserCenterModifyPass`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//关于我们
export async function publicData(data) {
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

//退出登录 
export async function logout() {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFLogout`,
			method: 'post'
		})
		return result
	} catch (e) {
		throw e
	}
}

//注销账户 
export async function deleteAccount(data) {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFUnRegisterUser`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//用户关注列表 
export async function getFocusList(data) {
	try {
		const result = await Axios.request({
			url: `UserCenter/IFAppUserCenterGetFocus`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}
