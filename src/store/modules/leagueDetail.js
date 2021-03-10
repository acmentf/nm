/*
 * @Author: FeikeQ
 * @Date: 2021-01-04 16:21:20
 * @LastEditTime: 2021-03-05 17:21:37
 * @LastEditors: FeikeQ
 * @FilePath: /nami-wap/src/store/modules/leagueDetail.js
 * @Description: 
 */

import * as api from '@/api/league'
const getDefaultState = () => {
    return {
        game_id: "LOL",
        league_id: null,
        summary: {
            name: null,
            time: null,
            logo: null,
            bonus: null,
            location: null
        },
        tabsList: [
            {
                name: "赛况",
                ui_type: 1
            },
            {
                name: "比赛",
                ui_type: 2
            },
            {
                name: "战队",
                ui_type: 3
            },
            {
                name: "数据榜",
                ui_type: 4
            }
        ],
        teams: [],
        matchList: [],
        topData: {
            tabColumn: {
                team: [],
                hero: [],
                maps: [],
                player: []
            },
            tabData: {
                team: [],
                hero: [],
                maps: [],
                player: []
            }
        }
    }
}
// initial state
const state = getDefaultState()
const leagueDetail = {
    namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
    state: state,
    actions: {
        // 获取联赛详细模块的tab分类分栏数据
        async _getModelGroupData({ commit, state }, parameter) {

            const data = await api.getModelGroupData({
                type: "1",
                subtype: "detail_tournament"
            });

            state.tabsList = [];
            if (data && data.tbls) {
                if (data.tbls[0] && data.tbls[0].tbl) {
                    var _tbl = data.tbls[0].tbl;
                    //   console.log('--获取联赛详细模块的tab分类分栏数据--',_tbl);
                    for (let index = 0; index < _tbl.length; index++) {
                        state.tabsList.push(_tbl[index])
                    }
                }
            }
            if (!state.tabsList.length) console.log("对不起，后端没有菜单数据...");

        },

        // 联赛详情-顶部 赛事简讯 
        async _getLeagueSummary({ commit, state }, parameter) {
            state.summary.name = '';
            state.summary.time = '';
            state.summary.logo = '';
            state.summary.bonus = '';
            state.summary.location = '';
            const data = await api.getLeagueSummary({
                game_id: state.game_id,
                tournament_id: state.league_id
            });
            //   state.summary = data;
            state.summary.name = data.tournament_name;
            state.summary.time = data.begin_time + " - " + data.end_time;
            state.summary.logo = data.tournament_logo;
            state.summary.bonus = data.bonus;
            state.summary.location = data.match_address;
        },

        // 联赛详情获取战队
        async _getLeagueTeam({ commit, state }, parameter) {
            state.teams = [];
            const data = await api.getLeagueTeam({
                game_id: state.game_id,
                tournament_id: state.league_id
            });

            if (data) {

                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    var _obj = {
                        id: element.team_id,
                        logo: element.team_img,
                        name: element.team_name,
                        member: []
                    }
                    if (element.team_member) {
                        for (let i = 0; i < element.team_member.length; i++) {
                            const _ele = element.team_member[i];
                            var _member = {
                                name: _ele.player_name,
                                country: _ele.country_img,
                            };
                            if (_ele.position_str) _member.position_str = _ele.position_str;
                            if (_ele.position_img) _member.position_img = _ele.position_img;
                            if (_ele.position) _member.place = _ele.position;

                            // 只取5条数据 
                            if (_obj.member.length < 5) _obj.member.push(_member);
                        }
                    }
                    state.teams.push(_obj);
                }
            }

            // console.log('--联赛详情获取战队--',state.teams);

        },


        // 联赛详情-比赛列表
        async _getLeagueMatchList({ commit, state }, parameter) {
            state.matchList = [];
            const data = await api.getLeagueMatchList({
                game_id: state.game_id,
                tournament_id: state.league_id
            });


            if (data) {
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];

                    var _group = {
                        date: element.title,
                        info: element.stage_name,
                        time: element.time,// 预留
                        time_str: element.time_str,// 预留
                        list: []
                    };
                    if (element.match_list) {
                        for (let i = 0; i < element.match_list.length; i++) {
                            const ele = element.match_list[i];
                            var _obj = {
                                game_id: ele.game_id,
                                match_id: ele.match_id,
                                is_focus: ele.is_focus,
                                time: ele.match_time,
                                rule: ele.box,
                                room_id: ele.room_id,// 预留
                                status_id: ele.status_id,// 预留
                                home: ele.home.team_short_name,
                                home_logo: ele.home.team_img,
                                home_score: ele.home_score,
                                home_result: 0,
                                home_id: ele.home.team_id,// 预留
                                away: ele.away.team_short_name,
                                away_logo: ele.away.team_img,
                                away_score: ele.away_score,
                                away_result: 0,
                                away_id: ele.away.team_id,// 预留
                            };
                            if (_obj.home_score > _obj.away_score) _obj.home_result = 1;
                            if (_obj.home_score < _obj.away_score) _obj.away_result = 1;
                            _group.list.push(_obj);
                        }
                    }
                    // console.log("_group",_group);
                    state.matchList.push(_group);
                }
            }

            // console.log('--联赛详情-比赛列表--',state.matchList);

        },

        // 联赛详情- 数据榜
        async _getLeagueRankList({ commit, state }, parameter) {
            var _type = parameter.type;
            state.topData.tabData[_type] = [];
            // state.matchList =[];
            const data = await api.getLeagueRankList({
                game_id: state.game_id,
                tournament_id: state.league_id,
                type: parameter.id
            });

            var _format_table_data = function (data) {
                // console.log("解析成表格数据结构",data);

                // 列的渲染规则
                var rule = {
                    TestByFeikeq: {
                        merge: 1, // 向前合并几列
                        type: "image", // 渲染类型: 文本text，图片image， 其它自己定义吧
                        unit: "%", // 当类型不为image图片时字段的单位 可以是 "" 或 "%" 或 "`" 等
                        isFrozen: true, // 是否为固定列
                        title: "队名", // 列的别名
                    },
                    WinRate: {
                        type: "legend"
                    },
                    FSDragonRate: {
                        type: "unit",
                        unit: "%"
                    },
                    SDragonCTRL: {
                        type: "unit",
                        unit: "%"
                    },
                    //爆头率
                    HeadRate: {
                        type: "unit",
                        unit: "%"
                    },
                    //手枪局胜率
                    GunRate: {
                        type: "unit",
                        unit: "%"
                    },
                    FBDragonRate: {
                        type: "unit",
                        unit: "%"
                    },
                    OverRate: {
                        type: "unit",
                        unit: "%"
                    },
                    AVGTime: {
                        type: "unit",
                        unit: "′"
                    },
                    FBloodRate: {
                        type: "unit",
                        unit: "%"
                    },
                    FTowerRate: {
                        type: "unit",
                        unit: "%"
                    },
                    // 战队榜
                    TeamName: {
                        width: 100,
                        isFrozen: true,
                        merge: 1,
                        title: "队名",
                        columnAlign: "left",

                    },
                    TeamIcon: {
                        type: "logo",
                    },

                    // 英雄榜
                    HeroName: {
                        width: 100,
                        isFrozen: true,
                        merge: 1,
                        title: "英雄名",
                        columnAlign: "left",

                    },
                    HeroIcon: {
                        type: "logo",
                    },

                    // 选手榜
                    PlayerName: {
                        width: 100,
                        isFrozen: true,
                        merge: 1,
                        title: "英雄名",
                        columnAlign: "left",
                    },
                    PlayerIcon: {
                        type: "logo",
                    },
                    AvgGroupRate: {
                        type: "legend"
                    },
                    EconomyRate:{type: "unit",unit: "%"}, // 选手榜 经济占比
                    AttackRate:{type: "unit",unit: "%"}, // 选手榜 输出占比
                    BearRate:{type: "unit",unit: "%"}, // 选手榜 承伤占比
                    EnterRate:{type: "unit",unit: "%"}, // 英雄榜 出场率
                    DisableRate:{type: "unit",unit: "%"},// 英雄榜 禁用率
                    BPRate:{type: "unit",unit: "%"},// 英雄榜  BP率
                    
                };

                var tableColumn = [
                    {
                        field: "rank",
                        title: "排名",
                        width: 45,
                        titleAlign: "center",
                        columnAlign: "center",
                        formatter: function (rowData, rowIndex, pagingIndex, field) {
                            var _index = (rowIndex + 1) * 1;
                            if (_index < 4) {
                                return `<span style="_color:#4078c0;">
                                            <img style="width:14px; max-height: 14px;" src="/images/${_index}.png" onerror="this.src='/images/team.png';this.onerror=null" />
                                            </span>`;
                            }
                            return `<span style="font-size:14px;">${_index}</span>`;
                        },
                        isResize: true,
                        isFrozen: true
                        // orderBy: "asc"
                    },
                ], tableData = [];
                if (data.title) {
                    for (let index = 0; index < data.title.length; index++) {
                        const element = data.title[index];
                        const _key = (data.feild) ? data.feild[index] : index;
                        console.log(_key, element);
                        var _column = {
                            field: _key,
                            title: element,
                            width: 80,
                            titleAlign: _key === 'TeamName' ? "left" : "center",
                            columnAlign: "center",
                            isResize: true,
                            isFrozen: false,
                            formatter: function (rowData, rowIndex, pagingIndex, field) {

                                if (typeof rowData[field] == "object") {
                                    var _type = rowData[field].type;
                                    if (_type == "image") {
                                        return `<span ><img style="width:14px;max-height:14px;" src="${rowData[field][_type]}" onerror="this.src='/images/team.png';this.onerror=null" /></span>`;
                                    } else if (_type == "logo") {
                                        return `<span ><img style="width:14px;max-height:14px;" src="${rowData[field][_type]}" onerror="this.src='/images/team.png';this.onerror=null" />
                                        ${rowData[field].value}</span>`;
                                    } else if (_type == "kda") {
                                        return `<p style="margin-top:5px;line-height:15px;">${rowData[field].value}<br/><span style="font-size: 8px;color: #8A8A8A;">${rowData[field][_type]}</p>`;
                                    } else if (_type == "legend") {
                                        return `<p style="margin-top:5px;line-height:15px;">${rowData[field].value}%</p>
                                <p style="width:100%;height:6px;background:#D8D8D8;border-radius:3px;margin-top:6px;line-height: 0;text-align:left;"><span style="background: #6521D7;display:inline-block;width:${rowData[field].value}%;height:6px;border-radius:3px;"></span></p>`;
                                    } else if (_type == "unit") {
                                        return `${rowData[field].value}${rowData[field][_type]}`;
                                    }
                                    return rowData[field].value;
                                }

                                return rowData[field];
                            }
                        };

                        //是否有特殊规则
                        if (rule[_key]) {
                            // 判断是否有合并列
                            if (rule[_key].merge) {
                                for (let _m = 0; _m < rule[_key].merge; _m++) {
                                    var _k_i = index + _m + 1;
                                    // console.log("index:"+index);
                                    // console.log("merge:"+_k_i);
                                    const _k_s = (data.feild) ? data.feild[_k_i] : _k_i;
                                    _column.field += '_' + _k_s;
                                }
                                index += rule[_key].merge;
                            }

                        }
                        tableColumn.push(Object.assign(_column, rule[_key]));
                    }
                }
                // console.log("tableColumn:",tableColumn);


                if (data.item_value) {

                    for (let rowIndex = 0; rowIndex < data.item_value.length; rowIndex++) {
                        const rowArr = data.item_value[rowIndex];
                        var _row = {};
                        // console.log("------------- rowArr -----------",rowArr);
                        for (let index = 0; index < rowArr.length; index++) {
                            const value = rowArr[index];
                            const _key = (data.feild) ? data.feild[index] : index;

                            var _name = _key;

                            var _val = {
                                value: value
                            };
                            //是否有特殊规则
                            if (rule[_key]) {
                                // console.log("是否有特殊规则",rule[_key])
                                var _t = rule[_key].type;
                                var _v = rule[_key][_t];
                                _val.type = _t;
                                // 如果有指定类型
                                if (_t) {
                                    if (_v) {
                                        _val[_t] = _v
                                    } else {
                                        // console.log("valuevaluevalue:",value);
                                        _val[_t] = value
                                    }
                                }
                            } else {
                                _val.type = 'text'
                            }
                            // console.log("_val_val",_val);
                            _row[_key] = _val;

                            //是否有特殊规则
                            if (rule[_key]) {
                                // 判断是否有合并列
                                if (rule[_key].merge) {
                                    // console.log('_row_row_row',_row);
                                    for (let _m = 0; _m < rule[_key].merge; _m++) {

                                        var _obj = Object.assign({}, _row[_key]);
                                        delete _row[_key];

                                        // console.log('rule[_key].merge',rule[_key].merge);
                                        var _k_i = index + _m + 1;
                                        const _k_s = (data.feild) ? data.feild[_k_i] : _k_i;
                                        _name += '_' + _k_s;

                                        var _temp = rowArr[_k_i];
                                        // console.log("_k_s",_k_s);
                                        // console.log("index",index,"_k_i",_k_i);
                                        // console.log("_temp",_temp);
                                        var _rule = rule[_k_s];

                                        var _val = null;
                                        if (_rule && _rule.type) {
                                            // console.log('eeeeeeee',_row);
                                            _obj.type = _rule.type;
                                            _obj[_rule.type] = _temp;
                                        } else {
                                            var _arr = [];
                                            _arr.push(_obj.value);
                                            _arr.push(_temp);
                                            _obj.value = _arr;
                                        }
                                        _row[_name] = _obj;

                                    }
                                    index += rule[_key].merge;
                                }
                            }
                            // var _row = {
                            //     team: {
                            //       type: "logo",
                            //       value: "Quandr",
                            //       logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25089.png"
                            //     },
                            //     kda: {
                            //       type: "kda",
                            //       value: "6.6",
                            //       kda: "10.2/12.8/11.4"
                            //     },
                            //     winner: {
                            //       type: "legend",
                            //       value: "80.2"
                            //     },
                            //     blood: {
                            //       type: "unit",
                            //       value: "80.2",
                            //       unit: "%"
                            //     }
                            // };

                        }
                        tableData.push(_row);
                    }
                }

                // console.log('「」表格数据「」'tableColumn,tableData);
                return { tableColumn, tableData };
            };


            if (data) {

                if (parameter.id === 4) {
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        var _map = {
                            mapimg: element.map_cover.value,
                            mapname: element.name.value,
                            session: element.use_times.value, //使用次数" //element.overtime_times.value,//总回合数  
                            t_win: element.t_win_rate.value,
                            ct_win: element.ct_win_rate.value,
                        };
                        state.topData.tabData[_type].push(_map);
                    }
                } else {
                    var _ok_data = _format_table_data(data); // 解析成表格数据结构
                    state.topData.tabColumn[_type] = _ok_data.tableColumn;
                    state.topData.tabData[_type] = _ok_data.tableData;
                    // console.log(state.topData.tabData[_type]);
                }
            }



            // console.log('--联赛详情- 数据榜--',state.topData);

        },

        // 联赛详情- 赛况页面
        async _getLeagueResult({ commit, state }, parameter) {
            if (parameter && parameter.tournament_id) {
                // state.matchList =[];
                const data = await api.getLeagueResult({
                    game_id: parameter.game_id,
                    tournament_id: parameter.tournament_id
                });
                return data ? data.pvp : []
            }


        },

    },
    getters: {
        get_leagueTabData(state) {

            return state.topData.tabData;

        },
        get_leagueTabColumn(state) {
            return state.topData.tabColumn;
        }


    }
}
export default leagueDetail