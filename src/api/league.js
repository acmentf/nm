/*
 * @Author: FeikeQ
 * @Date: 2021-01-14 09:13:53
 * @LastEditTime: 2021-01-18 14:02:49
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/api/league.js
 * @Description: 
 */
import Axios from './axiosConfig';

 
// 联赛详情-顶部 赛事简讯 
export async function getLeagueSummary(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAppUI_TLD_NL`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
};

// 获取模块分类分栏数据
export async function getModelGroupData(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFGetModelGroupData`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
};

// 获取 联赛详情-战队
export async function getLeagueTeam(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAppUI_TLD_BT`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
};

// 联赛详情-比赛列表
export async function getLeagueMatchList(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAppUI_TLD_Match`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
};



// 联赛详情- 数据榜
export async function getLeagueRankList(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAppUI_TLD_RankList`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
};



// 联赛详情- 赛况页面
export async function getLeagueResult(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAppUI_TLD_Result`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
};


