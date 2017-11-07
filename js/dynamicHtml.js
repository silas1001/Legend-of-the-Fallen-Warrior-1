"use strict";
//Create player Weapon skill html
var weaponTabActive = 'swordTest';
function changeTabWeapon(index) {
    weaponTabActive = index;
};
function CreateWeaponSkillHtml() {
    var html = '';
    html += '<div class="row">';
        html += '<div class="col-xs-10 col-xs-offset-1">';
            html += '<div class="row">';
    for (var itemType in weaponTypeObject) {
        if (weaponTypeObject.hasOwnProperty(itemType)) {
            var item = weaponTypeObject[itemType];
            var itemType2 = item.type;
            var itemType3 = item.type2;
            var weaponStat = weaponMastery[itemType2];
            html += '<div class="col-xs-2 passiveMargin">';
            html += '<a class="tooltips">';
            html += '<img class="skillBorder" src="images/skills/' + item.type + '.png">';
            html += '<span style="width:300px; bottom:30px; right:-150px;">';
            html += '<div class="row">';
            html += '<div class="col-xs-12">';
            html += item.displayName + ' skill progress:<br />';
            html += '等级: ' + weaponStat.level + '<br />';
            html += '<div class="progress">';
            html += '<div style="width: ' + player.properties[itemType3] + '%;" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" role="progressbar" class="progress-bar" id="' + item.type + "1" + '">';
            html += '<span id="' + item.type + '">' + player.properties[itemType3] + '%' + '</span></div></div>';
            html += '</div>';
            html += '</div>';
            html += 'Stat Multiplier:<br />';
            for (var statName in weaponStat) {
                if (weaponStat.hasOwnProperty(statName)) {
                    if ('strength, endurance, agility, dexterity, intelligence, wisdom, luck'.indexOf(statName) !== -1) {
                        html += statName.capitalizeFirstLetter() + ': ' + (weaponStat[statName]() * 100).toFixed(0) + '%' + '<br />';
                    };
                };
            };
            html += '</span></a>';
            html += '</div>';
        };
    };
    html += '</div>';
            html += '<div class="row">';
    for (var type in weaponSkillList) {
        if (weaponSkillList.hasOwnProperty(type)) {
            var weaponType = weaponSkillList[type];
            html += '<div class="col-xs-2">';
            html += '<div class="row">';
            for (var skill in weaponType) {
                if (weaponType.hasOwnProperty(skill)) {
                    var weaponSkill = weaponType[skill];
                    html += '<div class="col-xs-12 passiveMargin">';
                    html += '<a class="tooltips">';
                    html += '<img class="skillBorder" src="images/skills/' + weaponSkill.image + '.png">';
                    html += '<span style="width:200px; bottom:30px; right:-100px;">';
                    html += weaponSkill.name + '<br />';
                    html += 'Weapon skill required: ' + weaponSkill.levelReq + '<br />';
                    html += weaponSkill.description();
                    html += '</span></a>';
                    html += '<div class="row">';
                    html += '<div class="col-xs-8 col-xs-offset-2">';
                    html += '<img class="skillBorder" src="images/arrow.png">';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                };
            };
            html += '</div>';
            html += '</div>';
        };
    };
    html += '</div>';
        html += '</div>';
    html += '</div>';
    document.getElementById("weaponSkill").innerHTML = html;
};

//String prototype used to capitalize first letter, use it with "string".capitalizeFirstLetter()
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var monsterTabActiveNum = 0;
function changedTabmonster(index) {
    monsterTabActiveNum = index;
    if (index === 0 || (1 + (index + (index * 7))) < 10) {
        currentMonster = 'monster00' + (1 + (index + (index * 7)));
    }
    else {
        currentMonster = 'monster0' + (1 + (index + (index * 7)));
    }
    CreateMonsterHtml();
};
var currentMonster = 'monster001'; //Save current monster number, so I can pick it from array.
function CreateMonsterHtml() {
    var html = '';
    html += '<ul class="nav nav-tabs">';
    for (var k = 0; k < monsterAreas.length; k++) {
        if (monsterAreas[k].isUnlocked === true) {
            if (k === monsterTabActiveNum) {
                html += '<li class="monsterNavBar active" onClick = changedTabmonster(' + k + ')>';
            }
            else {
                html += '<li class="monsterNavBar" onClick = changedTabmonster(' + k + ')>';
            };
            html += '<a href="#tab_' + monsterAreas[k].type + '" data-toggle="tab"><span class="icons ' + monsterAreas[k].icon + '" data-toggle="tooltip" data-placement="right" title="' + monsterAreas[k].displayName + '"></span>' + '</a></li>';
        };
    };
    html += '</ul>';
    html += '<div class="tab-content">';
    for (var j = 0; j < monsterAreas.length; j++) {
        if (monsterAreas[j].isUnlocked === true) {
            if (j === monsterTabActiveNum) {
                html += '<div class="tab-pane active" ';
            }
            else {
                html += '<div class="tab-pane" ';
            };
            html += 'id="tab_' + monsterAreas[j].type + '">' +
                '<div class="panel panel-default">' +
                '<div class="panel-heading" style="background-color:' + player.properties.monsterBackground + ';">' +

                '<h3 class="panel-title c3" >' + monsterAreas[j].displayName + player.properties.prestigeSuffix + "[" + (Math.floor(player.properties.prestigeMultiplier - 1)) + "]" + '</h3>' +

                '</div>' +
                '<div class="panel-body" id="' + monsterAreas[j].type + '" style="background-color:' + player.properties.monsterBackground + ';">';
            html += '<div class="row">';
            var monster = monsterList[currentMonster];
            var area = monster.area;
            html += '<div class="col-xs-12 c3">';
            for (var key in monsterList) {
                var monsterNumberDisplay = monsterList[key].id;
                var monsterArea = monsterList[key].area;
                var monsterShow = monsterList[key].isShown;
                if (monsterArea === monsterAreas[j].type) {
                    if (monsterShow === true) {
                        html += '<button class="';
                        if (currentMonster === key) {
                            html += 'buttonSelected ';
                        }
                        html += 'monsterButtonDisable" style="margin-left:8px;" type="button" onclick="changeMonsterPage(' + "'" + key + "'" + ')">' + monsterNumberDisplay + '</button>';
                    };
                };
            };
            html += '</div>';
                if (area === monsterAreas[j].type) {
                    var monsterPercent = ((monster.hp / monster.maxHp) * 100);
                    var onclickevent = 'startBattle(' + "'" + currentMonster + "'" + ');';
                    html += '<div class="col-xs-10 col-xs-offset-1">' +//First Div
                        '<div class="row">' +//First Row
                        '<div class="col-xs-12 c3">' +//Second Div
                        '<div id="' + monster.id + '">' +
                        '<a href="#" class="tooltipA centerText" id="monsterButton">' +
                        '<img style="cursor:help;" src="images/monsters/' + monster.name + '.png" alt="' + monster.displayName + '">' +
                        '<span style="bottom:140px; left:-100px; pointer-events:none;">';
                        html += getMonsterTooltip(monster);
                        html += '</span></a>';


                        html += '<div class="progress" style="width:80%; margin-left:10%;">';
                        html += '<div style="width:' + monsterPercent + "%" + ';" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" role="progressbar" class="progress-bar" id="' + monster.name + "1" + '">';
                        html += '<span style="font-size:13px;">' + monster.hp + ' HP</span>' + '</div></div>';
                        html += '<button id="monster' + monster.id + '"' + 'class="monster sell" onclick="' + onclickevent + ' disableButtons();">Fight</button>';
                        html += '<div class="col-xs-12 c3">';
                        html += '<h4>Killed: ' + monster.killCount + '</h4>';
                        html += '</div>';
                        html += '<br /></div>';
                    html += '</div>';//Close second Div

                    html += '</div>';//Close first Row
                        html += '</div>';//Close First Div
                };
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        };
    };
    html += '</div>';

    document.getElementById("monsterTabs").innerHTML = html;
    testss();
};
function changeMonsterPage(name) {
    currentMonster = name;
    CreateMonsterHtml();
};

/*function CreateMonsterHtml() {
    var html = '';
    html += '<ul class="nav nav-tabs">';
    for (var k = 0; k < monsterAreas.length; k++) {
        if (monsterAreas[k].isUnlocked === true) {
            if (k === monsterTabActiveNum) {
                html += '<li class="active" onClick = changedTabmonster(' + k + ')>';
            }
            else {
                html += '<li onClick = changedTabmonster(' + k + ')>';
            };
            html += '<a href="#tab_' + monsterAreas[k].type + '" data-toggle="tab"><span class="icons ' + monsterAreas[k].icon + '" data-toggle="tooltip" data-placement="right" title="' + monsterAreas[k].displayName + '"></span>' + '</a></li>';
        };
    };
    html += '</ul>';
    html += '<div class="tab-content">';
    for (var j = 0; j < monsterAreas.length; j++) {
        if (monsterAreas[j].isUnlocked === true) {
            if (j === monsterTabActiveNum) {
                html += '<div class="tab-pane active" ';
            }
            else {
                html += '<div class="tab-pane" ';
            };
            html += 'id="tab_' + monsterAreas[j].type + '">' +
                '<div class="panel panel-default">' +
                '<div class="panel-heading" style="background-color:green;">' +

                '<h3 class="panel-title c3" >' + monsterAreas[j].displayName + '</h3>' +

                '</div>' +
                '<div class="panel-body" style="background-color:green;">';
            html += '<div class="row">';
            for (var key in monsterList) {
                if (monsterList.hasOwnProperty(key)) {
                    var monster = monsterList[key];
                    var area = monster.Stats.area;
                };
                if (area === monsterAreas[j].type) {
                    if (monster.Stats.isShown === true) {
                        var monsterPercent = ((monster.Stats.hp / monster.Stats.maxHp) * 100);
                        if (monster.Stats.type !== "mining") {
                            var onclickevent = 'attack(' + monster.Stats.name + ');';
                        }
                        else if (monster.Stats.type === "mining") {
                            var onclickevent = 'mine(' + monster.Stats.name + ');';
                        }
                        html += '<div class="col-xs-6 col-lg-3">' +
                            '<div class="row">' +
                            '<div class="col-xs-10 col-xs-offset-1" style="width:85%;">' +
                            '<div id="' + monster.Stats.id + '">' +
                            '<a href="#" class="tooltipA" id="monsterButton">' +
                            '<img class="monster" src="images/monsters/' + monster.Stats.name + '.png" alt="' + monster.Stats.displayName + '" onclick="' + onclickevent + '">' +
                            '<span style="bottom:120px; left:-100px; pointer-events:none;">' +
                            '<b>' + monster.Stats.displayName + '</b>';
                        if (monster.Stats.type !== "mining") {
                            html += '<br />' +
                            'Level: ' + monster.Stats.level +
                            '<br />' +
                            'Dmg:' + monster.Stats.minDmg + "-" + monster.Stats.maxDmg +
                            '<br />' +
                            'Def:' + monster.Stats.def;
                        };
                        html += '</span></a>' +
                            '<br /></div>';
                        html += '<div class="progress">';
                        html += '<div style="width:' + monsterPercent + "%" + ';" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" role="progressbar" class="progress-bar" id="' + monster.Stats.name + "1" + '">';
                        html += '<span style="font-size:13px;">' + monster.Stats.hp + ' HP</span>' + '</div></div>';
                        html += '</div>';


                        html += '</div></div>';
                    };
                };
            };
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        };
    };
    html += '</div>';

    document.getElementById("monsterTabs").innerHTML = html;
    testss();
};*/






function checkBoxHtml() {
    var html = "";
    html += '<div class="row">';
    html += '<div class="col-xs-10 col-xs-offset-1">';
    html += '<div class="centerText">';
    html += '<br /><label><input style="visibility:visible; position:relative;" type="checkbox" id="common" onclick="handleClick();"'
    if (checkBoxCommon === true) {
        html += "checked";
    }
    html += '><span style="background-color:gray; width:10px;height:10px;" data-toggle="tooltip" data-placement="top" title="Common">__</span></label>';

    html += '<label><input style="visibility:visible; position:relative;" type="checkbox" id="uncommon" onclick="handleClick();"'
    if (checkBoxUncommon === true) {
        html += "checked";
    }
    html += '><span style="background-color:green; width:10px;height:10px;" data-toggle="tooltip" data-placement="top" title="Uncommon">__</span></label>';

    html += '<label><input style="visibility:visible; position:relative;" type="checkbox" id="rare" onclick="handleClick();"'
    if (checkBoxRare === true) {
        html += "checked";
    }
    html += '><span style="background-color:blue; width:10px;height:10px;" data-toggle="tooltip" data-placement="top" title="Rare">__</span></label>';

    html += '<label><input style="visibility:visible; position:relative;" type="checkbox" id="epic" onclick="handleClick();"'
    if (checkBoxEpic === true) {
        html += "checked";
    }
    html += '><span style="background-color:orange; width:10px;height:10px;" data-toggle="tooltip" data-placement="top" title="Epic">__</span></label>';

    html += '<label><input style="visibility:visible; position:relative;" type="checkbox" id="legendary" onclick="handleClick();"'
    if (checkBoxLegendary === true) {
        html += "checked";
    }
    html += '><span style="background-color:red; width:10px;height:10px;" data-toggle="tooltip" data-placement="top" title="Legendary">__</span></label><br />';

    html += '</div>';
    html += '<div class="centerText">';
    html += '<strong>卖出稀有物品以下的所有物品（所有类型）</strong>';
    var sellAll = "sellAllItems();";
    html += '<br /><button type="button" class="sell" onclick=' + sellAll + '>全部卖出</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    document.getElementById('checkBoxHtml').innerHTML = html;
    testss();
};
var inventoryTabActiveNum = 0;
function changedTabInventory(index) {
    inventoryTabActiveNum = index;
};
function CreateInventoryWeaponHtml() {
    var html = '';
    var itemStat;
    html += '<div class="c3" id="updateInventorySlots">' + "Inventory Slots: " + playerInventory.length + "/" + player.functions.inventory() + '</div>';
    html += '<ul class="nav nav-tabs draggable">';
    for (var k = 0; k < InventoryItemTypes.length; k++) {
        if (k === inventoryTabActiveNum) {
            html += '<li class="active" onClick = changedTabInventory(' + k + ')>';
        }
        else {
            html += '<li onClick = changedTabInventory(' + k + ')>';
        }
        html += '<a href="#tab_' + InventoryItemTypes[k].type + '" data-toggle="tab"><span class="icons ' + InventoryItemTypes[k].icon + '" data-toggle="tooltip" data-placement="top" title="' + InventoryItemTypes[k].displayName + '"></span></a></li>';
    };
    html += '</ul>';
    html += '<div class="tab-content" id="tabControl_Inventory">';
    for (var j = 0; j < InventoryItemTypes.length; j++) {
        if (j === inventoryTabActiveNum) {
            if (InventoryItemTypes[j].type === 'other') {
                html += '<div class="col-xs-12 tab-pane active marginBottom"';
            }
            else {
                html += '<div class="col-xs-10 col-xs-offset-1 tab-pane active marginBottom"';
            };
        }
        else {
            if (InventoryItemTypes[j].type === 'other') {

                html += '<div class="col-xs-12 tab-pane marginBottom"';
            }
            else {
                html += '<div class="col-xs-10 col-xs-offset-1 tab-pane marginBottom"';
            };
        };
        html += 'id="tab_' + InventoryItemTypes[j].type + '" style="height:400px;">';
        html += '<div class="row" id="' + "inventorySpace" + InventoryItemTypes[j].type + '"' + '>';
        html += '<div class="c3" style="margin-bottom:10px;"><h4>库存</h4>';
        if (InventoryItemTypes[j].type !== 'other') {
            html += '<div class="c3">Sort by:</div>';
            var sortItemValue = 'onclick="sortInventory' + "(" + "'Value'" + ")"
            var sortItemRarity = 'onclick="sortInventory' + "(" + "'Rarity'" + ")"
            var sortItemLevel = 'onclick="sortInventory' + "(" + "'iLvl'" + ")"
            html += '<button type="button" ' + sortItemValue + '">属性值</button>';
            html += '<button type="button" ' + sortItemRarity + '">稀有度</button>';
            html += '<button type="button" ' + sortItemLevel + '">等级</button>';
            if (InventoryItemTypes[j].type === 'weapon') {
                var sortItemDamage = 'onclick="sortInventory' + "(" + "'Damage'" + ")"
                html += '<button type="button" ' + sortItemDamage + '">伤害</button>';
            };
        };
        html += '</div>';
        for (var i = 0; i < playerInventory.length; i++) {
            if (playerInventory[i].itemType === InventoryItemTypes[j].type) {
                if (playerInventory[i].itemType === "weapon") {
                    itemStat = equippedItems.weapon;
                }
                else if (playerInventory[i].subType === "shield") {
                    itemStat = equippedItems.shield;
                }
                else if (playerInventory[i].subType === "chest") {
                    itemStat = equippedItems.chest;
                }
                else if (playerInventory[i].subType === "helmet") {
                    itemStat = equippedItems.helmet;
                }
                else if (playerInventory[i].subType === "legs") {
                    itemStat = equippedItems.legs;
                }
                else if (playerInventory[i].subType === "boots") {
                    itemStat = equippedItems.boots;
                }
                else if (playerInventory[i].subType === "ring") {
                    itemStat = equippedItems.ring;
                }
                else if (playerInventory[i].subType === "amulet") {
                    itemStat = equippedItems.amulet;
                }
                else if (playerInventory[i].subType === "talisman") {
                    itemStat = equippedItems.talisman;
                }
                html += '<div ' + 'id="' + 'testingItem' + playerInventory[i].id + '"' + ' class="col-xs-6 col-sm-4 col-md-4 col-lg-2 c8 inventoryBlock ';
                if (playerInventory[i].itemType === "weapon") {
                    html += playerInventory[i].itemRarity + '">';
                    html += '<a class="tooltips2" style="cursor:pointer;">';
                    html += '<img class="' + playerInventory[i].itemType + " " + playerInventory[i].itemRarity;
                }
                else {
                    html += playerInventory[i].itemRarity + '">';
                    html += '<a class="tooltips2" style="cursor:pointer;">';
                    html += '<img class="' + playerInventory[i].subType + " " + playerInventory[i].itemRarity;
                }
                html += '"' + 'src="images/items/' + playerInventory[i].subType + "/" + playerInventory[i].image + '.png"' + 'onclick="equipItem' + "(" + playerInventory[i].id + ")" + '"/>';

                if (itemStat.hasOwnProperty('itemType')) {
                    html += '<span style="pointer-events:none; left:-100px;right:0; bottom:80px; width:400px;">';
                }
                else {
                    html += '<span style="width:300px; left:80px;right:0; bottom:50px;">';
                }
                html += '<div class="row">';
                html += '<div class="col-xs-12">';

                if (itemStat.hasOwnProperty('itemType')) {

                    var equippedItemDisplay = itemStat;

                    html += '<div class="row">';
                    html += '<div class="col-xs-6 borderRight">';

                    html += itemTooltipTest(equippedItemDisplay);

                    html += '<strong>Currently equipped</strong>';
                    html += '</div>';
                };

                if (itemStat.hasOwnProperty('itemType')) {
                    html += '<div class="col-xs-6">';
                }
                else {
                    html += '<div class="col-xs-10 col-xs-offset-1">';
                }
                //Start here
                html += itemTooltipTest(playerInventory[i]);
                ///End here
                html += '<strong>Left-Click to equip</strong>';
                html += '</div></div>';
                html += '</div>';
                if (itemStat.hasOwnProperty('itemType')) {
                    html += '</div>';
                }
                html += '</span>' + '</a>'
                html += '<button type="button" style="margin-top:5px;" class="inventorySell" onclick="itemSell' + "(" + playerInventory[i].id + ")" + '">Sell</button>';
                html += '</div>';
            };
        };

       
        if (InventoryItemTypes[j].type === 'other') {
            html += '<div class="row">';
            html += '<div class="col-xs-12">';
            html += 'Choose hot bar slot, then press a button next to a potion.';
            html += '<form role="form">';
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="1" checked="checked">1</input></label>'
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="2">2</input></label>'
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="3">3</input></label>'
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="4">4</input></label>'
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="5">5</input></label>'
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="6">6</input></label>'
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="7">7</input></label>'
            html += '<label class="radio-inline"><input class="visibilityLabel" type="radio" name="hotBarValue" value="8">8</input></label>'
            html += '</form>';
            html += '</div>';
            html += '</div>';
            html += '<div id="potionInventory">';
        };
        html += '</div>';
        html += '</div>';
    };
    html += '</div>';
    document.getElementById("inventory").innerHTML = html;
    testss();
    createPotionInventory();
};

function unequipItemLoad() { // Create a variable inside player.properties which store currently equipped item, for easy access...
    for (var key in loadingEquippedItems) {
        if (loadingEquippedItems.hasOwnProperty(key)) {
            var html = '';
            var i = loadingEquippedItems[key].type
            var itemStat = equippedItems[i];
            if (itemStat.subType !== undefined) {
                html += '<div class="col-xs-12 col-lg-6 c8"' + 'id="' + 'testingItem' + itemStat.id + '"' + '>';
                html += '<a class="tooltips" style="cursor:pointer;">';
                if (itemStat.itemType === "weapon") {
                    html += '<img class="' + itemStat.itemType;
                } else {
                    html += '<img class="' + itemStat.subType;
                }
                html += '"' + 'src="images/items/' + itemStat.subType + "/" + itemStat.image + '.png" onclick="equipItem' + "(" + itemStat.id + ")" + '"/>';
                if (itemStat.hasOwnProperty('itemType')) {
                    html += '<span>';
                } else {
                    html += '<span style="width:200px;">';
                }
                html += '<div class="row">';
                html += '<div class="col-xs-12">';

                if (itemStat.hasOwnProperty('itemType')) {
                    var equippedItemDisplay = itemStat;
                    html += '<div class="row">';
                    html += '<div class="col-xs-6">';
                    html += itemTooltipTest(equippedItemDisplay);
                    html += '<strong>Currently equipped</strong>';
                    html += '</div>';
                };

                if (itemStat.hasOwnProperty('itemType')) {
                    html += '<div class="col-xs-6">';
                } else {
                    html += '<div class="col-xs-10 col-xs-offset-1">';
                }
                html += itemTooltipTest(itemStat);
                html += '<strong>Left-Click to equip</strong>';
                html += '</div></div>';
                html += '</div>';
                if (itemStat.hasOwnProperty('itemType')) {
                    html += '</div>';
                }
                html += '</span>' + '</a>' +
                    '<button type="button" class="equip" onclick="itemSell' + "(" + itemStat.id + ")" + '">Sell</button>';
                html += '</div>';
                player.functions[i] = $(html);
            };
        };
    };
};
function CreatePlayerSkillsHtml() {
    var html = '';
    html += '<div class="row">';
    html += '<div class="col-xs-10 col-xs-offset-1">';
    html += '<div class="row">';
    html += '<div class="col-xs-6 col-xs-offset-3 c3">';
    html += '<button type="button" onclick="resetPassiveSkills();">Reset</button>';
    html += '<div class="fontSize">Skill points remaining: ' + player.properties.skillPoints + '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="row">';
    html += '<div class="talent-tree">';
    for (var i = 0, j = 0; i < 26 && j < 6; i += 5, j++) {
        if (i % 2 === 0) {//Get odd/even number and create 12 width column, which will store 2x 6width columns
            html += '<div class="col-xs-12">';
        };
        html += '<div class="col-xs-6">';
        html += '<center><button class="btn btn-default btn-lg btn-block" onclick="collapseWell(' + "'passiveSkillTree_" + i + "'" + ", '" + j + "'" + ')" ><strong>等级 ' + i + '</strong></button>';
        html += '</center>';
        if ($('#passiveSkillTree_' + i + ':hidden').length > 0) {
            html += '<div id="passiveSkillTree_' + i + '" class="' + j + '" style="display:none;"></div>';
        }
        else {
            html += '<div id="passiveSkillTree_' + i + '" class="' + j + '" style="display:block;"></div>';
        };
        html += '</div>';
        if (i % 2 !== 0) {
            html += '</div>';
        };
    };
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    //set overflow on playerSkills when height is higher than firstDiv, check with this code : $( "#firstDiv" ).height(); put inside a function and return true/false with comparison of both divs
    document.getElementById("playerSkills").innerHTML = html;
    for (var passiveSkill in playerPassive) {
        if (playerPassive.hasOwnProperty(passiveSkill)) {
            var test = getPassiveSkill(playerPassive, passiveSkill); //This will return an array with 2 indexes, index 0 is html, index 1 is skill info like skill level etc...
            document.getElementById('passiveSkillTree_' + test[1]).innerHTML += test[0];
        };
    };
};

function collapseWell(element, index) {
    $('#' + element).toggle();
};

function getPassiveSkill(key, objectValue) {
    var html = "";
    var returnValues = [];
    var passive = key[objectValue];
    var onclickevent = "upgradePassive('" + objectValue + "');";

    html += '<div class="col-xs-12 col-sm-6 col-lg-4">';//Opening Div for skill image
    html += '<div class="skill ';//Open first div
    if (passive.levelReq <= player.properties.level) {
        if (passive.level === 0) {
            html += "can-add-points ";
        }
        if (passive.level > 0 && passive.level < passive.maxLevel) {
            html += "can-add-points has-points ";
        }
        if (passive.level === passive.maxLevel) {
            html += "has-points has-max-points";
        }
    }
    html += '">';
    //Start of icon div's
    html += '<div class="icon-container">';
    html += '<div class="icon">';
    html += '<img src="images/passive/' + passive.image + '.png"">';
    html += '</div></div>';
    //End of icon div's
    //Start of div Frame
    html += '<div class="frame" onclick="' + onclickevent + '">';
    html += '<a class="tooltips" style="position:absolute; width:80px; height:80px; z-index:5;">';
    html += '<span style="bottom:110px; right:-100px; width:250px;">';
    html += passive.name + '<br />';
    html += passive.description();
    html += '<br />Level: ' + passive.levelReq;
    html += '<br />Level: ' + passive.level + '/' + passive.maxLevel;
    html += '</span></a>';
    html += '<div class="skill-points">';
    html += passive.level + '/' + passive.maxLevel;
    html += '</div>';
    html += '</div>';
    //End of div Frame
    html += '</div>';//Close first Div

    // html += '<div class="centerText passiveMargin">' + passive.level + '/' + passive.maxLevel + '</div>';

    html += '</div>';//Closing div for skill image
   
    returnValues = [html, passive.levelReq];
    return returnValues;
}

//Adds a logo to the starting screen
function startLogo() {
    var html = '';
    html += '<div class="row">';
    html += '<div class ="col-xs-12">';
    html += '</div></div>';
    document.getElementById("gameLogo").innerHTML = html;
}

//This screen shows up everytime you load a page...
function startingScreen() {
    var html = '';
    var newGame = "selectDifficulty();"; // might pass value to pick a slot for new game
    var loadGame = "loadGameSlot();"; // later on might need to pass some value when loading, once I add more save slots...
    var reset = "resetallSavesCheck();";
    var myAudio = document.getElementById('myAudioStart');
    html += '<div class="btn-group-vertical" role="group" aria-label="New game, load game">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + newGame + '">新游戏</button>';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + loadGame + '">加载</button>';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + reset + '">重玩</button>';
    html += '<label><input type="checkbox" id="hardcoreMode" style ="visibility:visible; position:relative;" onclick="hardcoreModeCheck();">极限模式？</label>';
    html += '</div>';
    html += '<br />';

    document.getElementById("buttonDiv").innerHTML = html;
    myAudio.volume = 0.1;
    myAudio.play();
};
startingScreen();
startLogo();
function selectDifficulty() {
    var html = "";
    var newGame = "newGameSlot();";
    var difficulty = ["Mortal", "Ageless", "Hero", "Immortal", "Lich", "Legend"];
    var nd="";
    html += '<div class="c3" style="font-size:large;"><strong>选择难度</strong></div>';
    html += '<div class="btn-group-horizontal" role="group" aria-label="Choose difficulty">';
    for (var i = 0; i < difficulty.length; i++) {
    if(difficulty[i] == "Mortal"){
        nd="凡人";
    }else if(difficulty[i] == "Ageless"){
        nd="不老";
    }else if(difficulty[i] == "Hero"){
        nd="英雄";
    }else if(difficulty[i] == "Immortal"){
        nd="神仙";
    }else if(difficulty[i] == "Lich"){
        nd="巫妖";
    }else if(difficulty[i] == "Legend"){
        nd="传奇";
    }
        html += '<button style="margin-left:5px;" class="btn btn-default btn-sm border" onclick="changeDifficulty(' + "'" + difficulty[i] + "'" + ')" title="'+ nd +'">' + nd + '</button>';
    }
    html += '</div>';
    html += '<div id="currentDifficulty">' + changeDifficulty() + '</div>';
    html += '<div class="btn-group-horizontal" role="group" aria-label="New game, load game">';
    html += '<button type="button" class="btn btn-default border" onclick="' + newGame + '">新游戏</button><br /><br />';
    html += '<button type="button" class="btn btn-default border" onclick="backToStartingScreen()">返回</button>';
    html += '</div>';
    document.getElementById("buttonDiv").innerHTML = html;
}
function newGameSlot() {
    characterCreationCreateBackground();
    var html = '';
    var newGameSlot0 = "newGame(0);";
    var newGameSlot1 = "newGame(1);";
    var newGameSlot2 = "newGame(2);";
    var newGameSlot3 = "newGame(3);";
    var displayInfo0 = "";
    var displayInfo = "";
    var displayInfo2 = "";
    var displayInfo3 = "";
    var saveInfo0 = "";
    var saveInfo1 = "";
    var saveInfo2 = "";
    var saveInfo3 = "";

    if (localStorage['EncodedSave']) {
        saveInfo0 = JSON.parse(atob(localStorage['EncodedSave']));
        if (saveInfo0.playerProperties.level === undefined || saveInfo0.playerProperties.heroRace === undefined) {
            localStorage.removeItem("EncodedSave");
            pageReload();
        }
        else {
            displayInfo0 = "当前存档：等级 - " + saveInfo0.playerProperties.level + ' Race: ' + saveInfo0.playerProperties.heroRace;
            if (saveInfo0.playerProperties.hardcoreMode === true) {
                displayInfo0 += " <strong>Hardcore</strong>"
            };
        }
    }
    else {
        displayInfo0 = "空槽";
    }

    if (localStorage['EncodedSave1']) {
        saveInfo1 = JSON.parse(atob(localStorage['EncodedSave1']));
        displayInfo = "当前存档：等级 - " + saveInfo1.playerProperties.level + ' 种族: ' + saveInfo1.playerProperties.heroRace;
        if (saveInfo1.playerProperties.hardcoreMode === true) {
            displayInfo += " <strong>Hardcore</strong>"
        };
    }
    else {
        displayInfo = "空槽";
    }
    if (localStorage['EncodedSave2']) {
        saveInfo2 = JSON.parse(atob(localStorage['EncodedSave2']));
        displayInfo2 = "当前存档：等级 - " + saveInfo2.playerProperties.level + ' 种族: ' + saveInfo2.playerProperties.heroRace;
        if (saveInfo2.playerProperties.hardcoreMode === true) {
            displayInfo2 += " <strong>Hardcore</strong>"
        };
    }
    else {
        displayInfo2 = "空槽";
    }
    if (localStorage['EncodedSave3']) {
        saveInfo3 = JSON.parse(atob(localStorage['EncodedSave3']));
        displayInfo3 = "当前存档：等级 - " + saveInfo3.playerProperties.level + ' 种族: ' + saveInfo3.playerProperties.heroRace;
        if (saveInfo3.playerProperties.hardcoreMode === true) {
            displayInfo3 += " <strong>Hardcore</strong>"
        };
    }
    else {
        displayInfo3 = "空槽";
    }

    html += '<div class="row">';
    html += '<div class ="col-xs-12 newGameButton">';
    html += '<div class="btn-group-vertical" role="group" aria-label="New game, load game">';
    html += '<div class="row">';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + newGameSlot1 + '">新游戏 1</button> ' + displayInfo;
    html += '</div>';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + newGameSlot2 + '">新游戏 2</button> ' + displayInfo2;
    html += '</div>';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + newGameSlot3 + '">新游戏 3</button> ' + displayInfo3;
    html += '</div>';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + newGameSlot0 + '">新游戏 0</button> ' + displayInfo0;
    html += '</div>';
    html += '</div></div>';
    html += '<button type="button" class="btn btn-default border startBackButtonMargin" onclick="backToStartingScreen()">返回</button>';
    html += '</div></div>';
    
    document.getElementById("raceCreation").innerHTML = html;
    //document.getElementById("raceText").innerHTML = html2
};

function loadGameSlot() {
    characterCreationCreateBackground();
    var html = '';
    var loadGameSlot0 = "loadGame(0);";
    var loadGameSlot1 = "loadGame(1);";
    var loadGameSlot2 = "loadGame(2);";
    var loadGameSlot3 = "loadGame(3);";
    var displayInfo0 = "";
    var displayInfo = "";
    var displayInfo2 = "";
    var displayInfo3 = "";
    var saveInfo0 = "";
    var saveInfo1 = "";
    var saveInfo2 = "";
    var saveInfo3 = "";
    if (localStorage['EncodedSave']) {
        saveInfo0 = JSON.parse(atob(localStorage['EncodedSave']));
        if (saveInfo0.playerProperties.level === undefined || saveInfo0.playerProperties.heroRace === undefined) {
            localStorage.removeItem("EncodedSave");
            pageReload();
        }
        displayInfo0 = "Level - " + saveInfo0.playerProperties.level + ' Race: ' + saveInfo0.playerProperties.heroRace;
        if (saveInfo0.playerProperties.hardcoreMode === true) {
            displayInfo0 += " <strong>Hardcore</strong>"
        };
    }
    else {
        displayInfo0 = "空槽";
    };
    if (localStorage['EncodedSave1']) {
        saveInfo1 = JSON.parse(atob(localStorage['EncodedSave1']));
        displayInfo = "Level - " + saveInfo1.playerProperties.level + ' Race: ' + saveInfo1.playerProperties.heroRace;
        if (saveInfo1.playerProperties.hardcoreMode === true) {
            displayInfo += " <strong></strong>"
        };
    }
    else {
        displayInfo = "空槽";
    };
    if (localStorage['EncodedSave2']) {
        saveInfo2 = JSON.parse(atob(localStorage['EncodedSave2']));
        displayInfo2 = "Level - " + saveInfo2.playerProperties.level + ' Race: ' + saveInfo2.playerProperties.heroRace;
        if (saveInfo2.playerProperties.hardcoreMode === true) {
            displayInfo2 += " <strong>Hardcore</strong>"
        };
    }
    else {
        displayInfo2 = "空槽";
    };
    if (localStorage['EncodedSave3']) {
        saveInfo3 = JSON.parse(atob(localStorage['EncodedSave3']));
        displayInfo3 = "Level - " + saveInfo3.playerProperties.level + ' Race: ' + saveInfo3.playerProperties.heroRace;
        if (saveInfo3.playerProperties.hardcoreMode === true) {
            displayInfo3 += " <strong>Hardcore</strong>"
        };
    }
    else {
        displayInfo3 = "空槽";
    };

    html += '<div class="row">';
    html += '<div class ="col-xs-12 newGameButton">';
    html += '<div class="btn-group-vertical" role="group" aria-label="New game, load game">';
    html += '<div class="row">';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + loadGameSlot1 + '">加载游戏 1</button> ' + displayInfo;
    html += '</div>';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + loadGameSlot2 + '">加载游戏 2</button> ' + displayInfo2;
    html += '</div>';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + loadGameSlot3 + '">加载游戏 3</button> ' + displayInfo3;
    html += '</div>';
    html += '<div class ="col-xs-12">';
    html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" onclick="' + loadGameSlot0 + '">加载游戏 0</button> ' + displayInfo0;
    html += '</div>';
    html += '</div></div>';
    html += '<button type="button" class="btn btn-default border startBackButtonMargin" onclick="backToStartingScreen()">返回</button>';
    html +='</div></div>';

    document.getElementById("raceCreation").innerHTML = html;
};


function backToStartingScreen() {
    var divStyle4 = document.getElementById('raceDiv'); // Race select screen
    divStyle4.style.display = "none";
    var divStyle3 = document.getElementById('startingScreen'); // Starting buttons: new game/ load game/ sound button etc
    divStyle3.style.display = "block"; // none = not displayed
    startingScreen();
};

function characterCreationCreateBackground() {
    var divStyle = document.getElementById('loadingContainer'); // Whole background of starting screen "a container"
    divStyle.style.display = "block"; //block = display it
    var divStyle3 = document.getElementById('startingScreen'); // Starting buttons: new game/ load game/ sound button etc
    divStyle3.style.display = "none"; // none = not displayed
    var divStyle4 = document.getElementById('raceDiv'); // Race select screen
    divStyle4.style.display = "block";
    var divStyle5 = document.getElementById('sliderDivID'); // Race select screen
    divStyle5.style.display = "none";
    var divStyle6 = document.getElementById('raceText'); // Race select screen
    divStyle6.style.display = "none";
};
function characterCreationCreateBackground2() {
    var divStyle = document.getElementById('loadingContainer'); // Whole background of starting screen "a container"
    divStyle.style.display = "block"; //block = display it
    var divStyle3 = document.getElementById('startingScreen'); // Starting buttons: new game/ load game/ sound button etc
    divStyle3.style.display = "none"; // none = not displayed
    var divStyle4 = document.getElementById('raceDiv'); // Race select screen
    divStyle4.style.display = "block";
};

function removeStartingScreen() {
    var divStyle = document.getElementById('loadingContainer');
    divStyle.style.display = "none";
    var divStyle2 = document.getElementById('startingGameContainer');
    divStyle2.style.display = "none";
    var soundButton = document.getElementById('SoundButton');
    soundButton.style.display = "none";
};
function characterCreationHtml() {
    characterCreationCreateBackground2();
    if (player.properties.heroRace === '') { // If you press "New game" race property will be empty, allowing you to pick a race, otherwise you will load a game with a race already picked :)
        var html = '';
        var html2 = '';
        html2 += '<div class="row">';
        html2 += '<div class="col-xs-6 col-xs-offset-3">';
        html2 += '点击 ' + '<p class="glyphicon glyphicon-info-sign" style="color:black"></p>' + ' 查看更多信息。';
        html2 += '</div></div>';
        html += '<div class="row">';
        html += '<div class="col-xs-12 col-xs-offset-1">';
        html += '<div class="row">';
        for (var hero in characterRaces) {
            if (characterRaces.hasOwnProperty(hero)) {
                var heroRace = characterRaces[hero];
                var onclickevent = "changeRace('" + heroRace.name + "', '" + hero + "');";
                html += '<div class="col-xs-6 col-xs-offset-2">';
                html += '<img src="images/races/' + heroRace.image() + '.png">';
                var cnname="";
                if(heroRace.name == "Human"){
        cnname="人类";
    }else if(heroRace.name == "Half Elf"){
        cnname="半精灵";
    }else if(heroRace.name == "Dwarf"){
        cnname="矮人";
    }else if(heroRace.name == "Orc"){
        cnname="兽人";
    }else if(heroRace.name == "Elf"){
        cnname="地精";
    }else if(heroRace.name == "Halfing"){
        cnname="矮人";
    }else if(heroRace.name == "Sylph"){
        cnname="精灵";
    }else if(heroRace.name == "Giant"){
        cnname="巨人";
    }
                html += cnname + " ";
                html += '<a class="tooltips">' + '<p class="glyphicon glyphicon-info-sign" style="color:black"></p>' +
                    '<span style="width:350px; left: 110px; bottom:-30px; text-align:left;">' +
                    '<div class="row">' +
                    '<div class="col-xs-10 col-xs-offset-1">' +
                    cnname +
                    '</div></div>' +
                    '<div class="row">' +
                    '<div class="col-xs-5" style="padding-left:46px;">';
                for (var stat in heroRace) {
                    if (heroRace.hasOwnProperty(stat)) {
                        if ('strength, endurance, agility, dexterity, wisdom, intelligence, luck'.indexOf(stat) !== -1) {
                            var shuxing="";
                            if(stat.substring(0, 3).capitalizeFirstLetter() == "Str"){
                                shuxing="力量";
                            }else if(stat.substring(0, 3).capitalizeFirstLetter() == "End"){
                                shuxing="耐力";
                            }else if(stat.substring(0, 3).capitalizeFirstLetter() == "Agi"){
                                shuxing="敏捷";
                            }else if(stat.substring(0, 3).capitalizeFirstLetter() == "Dex"){
                                shuxing="闪避";
                            }else if(stat.substring(0, 3).capitalizeFirstLetter() == "Wis"){
                                shuxing="智慧";
                            }else if(stat.substring(0, 3).capitalizeFirstLetter() == "Int"){
                                shuxing="智力";
                            }else if(stat.substring(0, 3).capitalizeFirstLetter() == "Luc"){
                                shuxing="幸运";
                            }
                            html += shuxing + ': ';
                            for (var i = 0; i < heroRace[stat](); i++) {
                                if (heroRace[stat]() >= 6) {
                                    html += '<font color="orange">+</font>';
                                } else if (heroRace[stat]() >= 4) {
                                    html += '<font color="green">+</font>';
                                } else if (heroRace[stat]() === 3) {
                                    html += '<font color="blue">+</font>';
                                } else if (heroRace[stat]() < 3) {
                                    html += '<font color="red">+</font>';
                                };
                            };
                            html += '<br />';
                        };
                    };
                };
                html += '</div>';
                html += '<div class="col-xs-7">';
                html += '种族加成:<br />';
                for (stat in heroRace) { // var stat is being declared already, so this one is without a 'var'...
                    if (heroRace.hasOwnProperty(stat)) {
                        if ('raceAllStats, raceGoldDrop, raceExpRate, raceDropRate, raceEvasion, raceDamage, raceHealth, raceAccuracy, raceDefense, raceManaRegen, raceMaxMana, raceCriticalChance, raceSpellPower'.indexOf(stat) != -1) {
                            var string = stat.substring('race'.length);
                            if (stat === "raceAccuracy" && heroRace[stat]() > 111) {
                                html += '从不打偏<br />';
                            } else if (stat === "raceEvasion" && heroRace[stat]() === "Can't evade") {
                                html += "不能回避";
                            } else {
                                console.log(string.replace(/([a-z])([A-Z])/g, '$1 $2'))
                                var jc="";
                                if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "All Stats"){
                                    jc="所有状态";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Exp Rate"){
                                     jc="经验加成";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Drop Rate"){
                                     jc="装备掉率";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Gold Drop"){
                                     jc="金币掉落";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Evasion"){
                                     jc="闪避";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Defense"){
                                     jc="防御";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Damage"){
                                     jc="伤害";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Health"){
                                     jc="生命";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Critical Chance"){
                                     jc="暴击几率";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Mana Regen"){
                                     jc="法力回复";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Max Mana"){
                                     jc="最大法力";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Spell Power"){
                                     jc="法术强度";
                                }else if(string.replace(/([a-z])([A-Z])/g, '$1 $2') == "Accuracy"){
                                     jc="命中率";
                                }
                                html += jc + ': '; //remove part of the string which start from lower case "race", and add space before each upper case, changing raceMaxMana to "Max Mana"
                                if (heroRace[stat]() > 0) {
                                    html += '+';
                                };
                                html += heroRace[stat]() + '%' + '<br />'
                            };
                        };
                    };
                };
                html += '<br /><img src="images/races/' + heroRace.image() + '.png">';
                html += '</div>';
                html += '</div>';
                html += '<div class="row">';
                html += '<div class="col-xs-10 col-xs-offset-1">';
                html += '<br /><font color="#CC6633">' + heroRace.lore() + '</font>';
                html += '</div>' + '</div>' +
                    '</span>' + '</a>';
                html += '</div>';
                html += '<div class="col-xs-2">';
                html += '<button type="button" style="margin-bottom:5px;" class="btn btn-default border" class="' + heroRace.name + '" onclick="' + onclickevent + '">选择</button>' //changeRace function ._.
                html += '</div>';

            };
        };
        html += '<div class="row">'
        html += '<div class="col-xs-2 col-xs-offset-5">';
        html += '<button type="button" class="btn btn-default border startBackButtonMargin" onclick="newGameSlot()">返回</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        document.getElementById("raceCreation").innerHTML = html;
        document.getElementById("raceText").innerHTML = html2;
    };
    var divStyle2 = document.getElementById('sliderDivID');
    divStyle2.style.display = "block";
    checkHeroRace();
};
function checkHeroRace() {
    var html = '';
    for (var hero in characterRaces) {
        var heroRace = characterRaces[hero];
        if (player.properties.heroRace === heroRace.name) {
            html += '<a href="#" class="tooltipA">' + '<img src="images/races/' + heroRace.image() + '.png">' + '<span style="width:350px; right: 10%; top:10px; text-align:left;">' +
                '<div class="row">' +
                    '<div class="col-xs-10 col-xs-offset-1">' +
                    heroRace.name +
                    '</div></div>' +
                    '<div class="row">' +
                    '<div class="col-xs-5" style="padding-left:46px;">';
            for (var stat in heroRace) {
                if ('strength, endurance, agility, dexterity, wisdom, intelligence, luck'.indexOf(stat) != -1) {
                    html += stat.substring(0, 3).capitalizeFirstLetter() + ': ';
                    for (var i = 0; i < heroRace[stat]() ; i++) {
                        if (heroRace[stat]() >= 6) {
                            html += '<font color="orange">+</font>';
                        }
                        else if (heroRace[stat]() >= 4) {
                            html += '<font color="green">+</font>';
                        }
                        else if (heroRace[stat]() === 3) {
                            html += '<font color="blue">+</font>';
                        }
                        else if (heroRace[stat]() < 3) {
                            html += '<font color="red">+</font>';
                        };
                    };
                    html += '<br />';
                };
            };
            html += '</div>';
            html += '<div class="col-xs-7">';
            html += 'Bonuses:<br />';
            for (var stat in heroRace) {
                if ('raceAllStats, raceGoldDrop, raceExpRate, raceDropRate, raceEvasion, raceDamage, raceHealth, raceAccuracy, raceDefense, raceManaRegen, raceMaxMana, raceCriticalChance, raceSpellPower'.indexOf(stat) != -1) {
                    var string = stat.substring('race'.length);
                    if (stat === "raceAccuracy" && heroRace[stat]() > 111) {
                        html += 'Never Miss<br />';
                    }
                    else if (stat === "raceEvasion" && heroRace[stat]() === "Can't evade") {
                        html += "Can't Evade";
                    }
                    else {
                        html += string.replace(/([a-z])([A-Z])/g, '$1 $2') + ': ';
                        if (heroRace[stat]() > 0) {
                            html += '+';
                        };
                        html += heroRace[stat]() + '%' + '<br />'
                    }
                }
            }
            html += '<br /><img src="images/races/' + heroRace.image() + '.png">';
            html += '</div>';
            html += '</div>';
            html += '<div class="row">';
            html += '<div class="col-xs-10 col-xs-offset-1">';
            html += '<br /><font color="#CC6633">' + heroRace.lore() + '</font>';
            html += '</div>' + '</div>' +
            '</span>' + '</a>';
        };
    };
    document.getElementById("characterRace").innerHTML = html;
    raceStats(); // Function which add all bonuses from races to player properties.
};


function changeMusicImage() {
    var test = muteAudio('test');
    var musicImage = document.getElementById('musicImage');
    var musicImage2 = document.getElementById('musicimage2');
    if (test === false) {
        musicImage.className = "glyphicon glyphicon-volume-up";
        musicImage2.className = "glyphicon glyphicon-volume-up";
    }
    else {
        musicImage.className = "glyphicon glyphicon-volume-off";
        musicImage2.className = "glyphicon glyphicon-volume-off";
    }
};

function primaryStatUpdate() {
    var html = '';
    html += '<div class="row">';
    for (var key in primaryStatInfo) {
        var currentBonus = primaryStatInfo[key];
        var statInfo = primaryStatInfo[key].info;
        var number = primaryStatInfo[key].number;
        var background = "";
        var statDisplay2 = primaryStatInfo[key].type;
        var shortNameDisplay = primaryStatInfo[key].shortNameDisplay;
        var statDisplay = "";
        if (currentBonus.type === "damage" || currentBonus.type === "Stats" || currentBonus.type === "mana" || currentBonus.type == "spellPower") {
             statDisplay = '<span id="' + statInfo + '"></span>';
        }
        else {
             statDisplay = '<span id="' + statInfo + '"></span>' +
                '<span id="' + currentBonus.type.capitalizeFirstLetter() + '" style="cursor:pointer" onclick="upgrade' + currentBonus.type.capitalizeFirstLetter() + '(event);" data-toggle="tooltip" data-placement="top" title="Increase ' + currentBonus.type + '">' +
                '<span class="glyphicon glyphicon-plus unselectable"></span></span>';
        };
        if (number === 1) {
            background = "darkBackground";
        }
        else if (number === 2) {
            background = "darkBackground";
        };
        if (currentBonus.type === "damage" || currentBonus.type === "mana" || currentBonus.type == "spellPower") {
            html += '<div class="col-xs-12 col-sm-6 primaryStatsMargin border darkBackground">';
            html += '<div class="row">';
            html += '<div class="col-xs-6">';
        }
        else {
            html += '<div class="col-xs-6 col-sm-3 col-md-6 primaryStatsMargin border darkBackground">';
            html += '<div class="row">';
            html += '<div class="col-xs-4">';
        }
        var statDisplay3 = statDisplay2.capitalizeFirstLetter();
        if ('Strength, Endurance, Agility, Dexterity, Wisdom, Intelligence, Luck, Damage, Mana, Stats, SpellPower'.indexOf(statDisplay3) != -1) {
            var tooltip = primaryStatInfo[key].tooltip;
            html += '<span data-toggle="tooltip" data-placement="top" title="' + tooltip + '"><img src="images/stat/' + statDisplay2 + '.png"></span><br />';
            html += shortNameDisplay;
        };
        html += '</div>';
        
        if (currentBonus.type === "damage" || currentBonus.type === "mana" || currentBonus.type == "spellPower") {
            html += '<div class="col-xs-6 rightAlign primaryNumberMargin">';
        }
        else {
            html += '<div class="col-xs-8 rightAlign primaryNumberMargin darkBackground">';
        }
        html += statDisplay + ' ';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    html += '</div>';
    document.getElementById("primaryStat").innerHTML = html;
    updateHtml();
};
function secondaryStatUpdate(){
    var html = '';
    html += '<div class="row">';
    html += '<div class="centerText"><h4>Secondary Stats</h4></div>';
    for (var key in secondaryStatInfo) {
        var currentBonus = secondaryStatInfo[key];
        var statInfo = secondaryStatInfo[key].info;
        var number = secondaryStatInfo[key].number;
        var statDisplay = "";
        var background = "";
        if (currentBonus.type === "Stats" || currentBonus.type === "Skill points") {
             statDisplay = player.properties[statInfo];
        }
        else {
             statDisplay = player.functions[statInfo]();
        };
        var statDisplay2 = secondaryStatInfo[key].displayName;
        if (number === 1) {
             background = "darkBackground";
        }
        else if (number === 2) {
             background = "background";
        };
        html += '<div class="col-xs-6 primaryStatsMargin border ' + background + '" style="height:40px;">';
        html += '<div class="row">';
        html += '<div class="col-xs-8 secondaryStatMargin">';
        html += '<span data-toggle="tooltip" data-placement="right" title="' + currentBonus.tooltip() + '">';
        html += statDisplay2 + ":";
        html += '</span>';
        html += '</div>';
        html += '<div class="col-xs-4 rightAlign secondaryStatMargin">';
        html += '<span data-toggle="tooltip" data-placement="right" title="' + currentBonus.tooltip() + '">';
        if (currentBonus.type === "Magic find" || currentBonus.type === "Gold drop" || currentBonus.type === "Experience rate") {
            html += ((statDisplay) * 100).toFixed(0);
        }
        else if (currentBonus.type === "Accuracy" && player.functions.accuracy() > 111) {
            html += "Max";
        }
        else if (currentBonus.type === "Evasion" && player.functions.evasion() === 0) {
            html += "None";
        }
        else if (currentBonus.type === "Crit damage") {
            html += (statDisplay * 100).toFixed(0);
        }
        else {
            html += statDisplay.toFixed(0);
        };
        if (currentBonus.type === "Accuracy" && player.functions.accuracy() < 111 || currentBonus.type === "Evasion" && player.functions.evasion() > 0) {
            html += '%';
        };
        if (currentBonus.isPercent === true && currentBonus.type !== "Accuracy" && currentBonus.type !== "Evasion") {
            html += '%';
        };
        html += '</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    };
    html += '</div>';
    document.getElementById("secondaryStat").innerHTML = html;
    testss();
};

function EquippedItemsEmpty() {
    var html = '';
    html += '<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">';
    html += '<div class="row" style="padding-top: 5px; padding-bottom: 10px;">';
    html += '<div class="centerText" style="margin-right:20px;"><h4>Equipped Items</h4></div>';
    for (var itemType in emptyItemSlotInfo) {
        if (emptyItemSlotInfo.hasOwnProperty(itemType)) {
            var item = emptyItemSlotInfo[itemType].type;
            var itemEmpty = item + "Empty";
            if (item === "talisman" || item === "helmet" || item === "amulet") {
                if (item === "talisman") {
                    html += '<div class="col-xs-10 col-xs-offset-1">';
                    html += '<div class="row">';
                }
                html += '<div class="col-xs-4 marginTest"' + 'id="' + itemEmpty + '">';
                html += '<img src=images/' + itemEmpty + '.png>';
                html += '</div>';
                if (item === "amulet") {
                    html += '</div>';
                    html += '</div>';
                };
            } else if (item === "weapon" || item === "chest" || item === "shield") {
                if (item === "weapon") {
                    html += '<div class="col-xs-10 col-xs-offset-1">';
                    html += '<div class="row">';
                }
                html += '<div class="col-xs-4 marginTest"' + 'id="' + itemEmpty + '">';
                html += '<img src=images/' + itemEmpty + '.png>';
                html += '</div>';
                if (item === "shield") {

                    html += '</div>';
                    html += '</div>';
                }
            } else if (item === "legs" || item === "ring") {
                if (item === "legs") {
                    html += '<div class="col-xs-10 col-xs-offset-1">';
                    html += '<div class="row">';
                    html += '<div class="col-xs-4 marginTest">';
                    html += '</div>';
                }
                html += '<div class="col-xs-4 marginTest"' + 'id="' + itemEmpty + '">';
                html += '<img src=images/' + itemEmpty + '.png>';
                html += '</div>';
                if (item === "ring") {
                    html += '</div>';
                    html += '</div>';
                }
            } else if (item === "boots") {
                html += '<div class="col-xs-10 col-xs-offset-1">';
                html += '<div class="row">';
                html += '<div class="col-xs-4 col-xs-offset-4"' + 'id="' + itemEmpty + '">';
                html += '<img src=images/' + itemEmpty + '.png>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            };
        };
    };
    html += '</div>';
    html += '</div>';
    document.getElementById("equipHtml").innerHTML = html;
};

function checkIfEquippedEmpty() {
    var html = '';
    for (var item in equippedItems) {
        var itemType = equippedItems[item];
        if (itemType.isEquipped === true) {
            var testItem = checkEquippedItemType(item);
            $('#' + item + "Empty" + '').empty().append(testItem);
        }
        else if (itemType.isEquipped === false) {
            var currentItem = '<img src=images/' + item + "Empty" + '.png>';
            $('#' + item + "Empty" + '').empty().append(currentItem);
        }
    }
};

function checkEquippedItemType(newItem, check) {
    var html = '';
    var item = equippedItems[newItem];
    var itemType = item;
    if (itemType.hasOwnProperty('itemType')) {
        html += '<div id="equippedItem' + itemType.id + '"' + '>';
        html += '<a class="tooltips" style="cursor:pointer;">';
        if (itemType.itemType === "weapon") {
            html += '<img class="' + itemType.itemType;
        }
        else {
            html += '<img class="' + itemType.subType;
        }
        html += '"' + 'src="images/items/' + itemType.subType + "/" + itemType.image + '.png" onclick="unequipItem' + "(" + itemType.id + ', ' + "'solo'" + ")" + '" />';
        html += '<span style="width:200px; left:150px; right:0px; bottom:-120px;">';
        html += '<div class="row">';
        html += '<div class="col-xs-12">';

        if (itemType.hasOwnProperty('itemType')) {
            var equippedItemDisplay = itemType;
            html += itemTooltipTest(equippedItemDisplay);
            html += '<strong>Currently equipped</strong>';
            html += '</div>';
            html += '</div>';
            html += '</span></a>';
        };
        html += '</div>';
    };
    return html;
};


function saveGameSlot() {
    var html = '';

    var onclickevent = 'onclick="saveGameFunction' + "(" + "'manualSave', " + player.properties.saveSlot + ")" + '">';
    var onclickevent2 = 'onclick="load' + "(" + player.properties.saveSlot + ")" + '">';
    html += '<button type="button" class="btn btn-sm btn-default"' + onclickevent;
    html += 'save'
    html += '</button>'
    html += '<button type="button" class="btn btn-sm btn-default"' + onclickevent2;
    html += 'load'
    html += '</button>'
    html += '<button type="button" class="btn btn-sm btn-default" onclick="resetCheck()">'
    html += 'reset'
    html += '</button><br /><br />'
    document.getElementById('saveGameSlot').innerHTML = html;
};


var itemShopWeapon = [];
var itemShopArmor = [];
var itemShopAccessory = [];
var weaponAmount = 0;
var armorAmount = 0;
var accessoryAmount = 0;
function getShopItem() {
    var shopItemAmount = 100;
    var shopItemLevel = player.properties.level;
    var weaponLevelBonus = 5;
    var armorLevelBonus = 5;
    for (var i = 0; i < shopItemAmount; i++) {
        if (itemShopWeapon.length < 20 || itemShopArmor.length < 20 || itemShopAccessory.length < 20) {
            getNewItem(shopItemLevel, false);
        }
        else {
            break;
        }
    };
    createShopTabs();
    displayShopItems(itemShopWeapon);
    displayShopItems(itemShopArmor);
    displayShopItems(itemShopAccessory);
    shopOther();
};
var shopItemTabs = [
    {
        name: "shopWeapon",
        type: "weapon"
    },
    {
        name: "shopArmor",
        type: "armor"
    },
    {
        name: "shopAccessory",
        type: "accessory"
    },
    {
        name: "shopOther",
        type: "items"
    }
];

                                       

function createShopTabs() {
    var html = "";
    html += '<ul class="nav nav-tabs">';

    for (var i = 0; i < 4; i++) {
        if (i === 0) {
            html += '<li class="active">';
        }
        else {
            html += '<li>';
        }
        html += '<a href="#tab_' + shopItemTabs[i].name + '" data-toggle="tab"><span class="icons ' + shopItemTabs[i].type + '" data-toggle="tooltip" data-placement="top" title="' + shopItemTabs[i].name.capitalizeFirstLetter() + '"></span>';
        html += '</li>';
    }

    html += '</ul>';
    html += '<div class="tab-content">';
    
    for (var i = 0; i < 4; i++){
        html += '<div class="tab-pane ';
        if (i === 0){
            html += 'active" ';
        }
        else {
            html += '" ';
        }
        html += 'id="tab_' + shopItemTabs[i].name + '">';
        html += '<div id="' + shopItemTabs[i].name + '"></div>';
        html += '</div>';
    }
    html += '</div>';

    $('#shopTabs').empty().append(html);
}

function displayShopItems(type) {
    var html = '';
    var itemTypeDisplay = type;
    var event = "";
    var event2 = "";
    if (type === itemShopWeapon) {
         event = 'onclick="sortShop' + "(" + "'Value', " + "'Weapon'" + ")" + '">';
         event2 = 'onclick="sortShop' + "(" + "'Rarity', " + "'Weapon'" + ")" + '">';
    }
    else if (type === itemShopArmor) {
         event = 'onclick="sortShop' + "(" + "'Value', " + "'Armor'" + ")" + '">';
         event2 = 'onclick="sortShop' + "(" + "'Rarity', " + "'Armor'" + ")" + '">';
    }
    else if (type === itemShopAccessory) {
         event = 'onclick="sortShop' + "(" + "'Value', " + "'Accessory'" + ")" + '">';
         event2 = 'onclick="sortShop' + "(" + "'Rarity', " + "'Accessory'" + ")" + '">';
    }
    html += '<div class="row">';
    html += '<div class="col-xs-10 col-xs-offset-1">';
    html += '<div class="shopItemBuy"></div>';
    html += '<div class="c3">Sort by:<br />';
    html += '<button type="button" ' + event + "Value" + '</button>';
    html += '<button type="button" ' + event2 + "Rarity" + '</button>';
    html += '</div>';
    html += '<div class="row">';
    html += '<div class="col-xs-12">';
    html += '<div class="c3"><h3>道具商店</h3></div></div>';
    for (var i = 0; i < itemTypeDisplay.length; i++) {
        var itemDisplay = itemTypeDisplay[i];
        html += '<div class="col-xs-2 inventoryBlock ' + itemDisplay.itemRarity + '">';
                html += '<a class="tooltips" style="cursor:pointer;">';
                html += '<label> <input type="radio" name="shopItem" value=' + itemDisplay.id + '>';
                if (itemDisplay.itemType === "weapon") {
                    html += '<img class="' + itemDisplay.itemType + ", " + itemDisplay.itemRarity;
                }
                else {
                    html += '<img class="' + itemDisplay.subType + ", " + itemDisplay.itemRarity;
                }
                html += '"' + 'src="images/items/' + itemDisplay.subType + "/" + itemDisplay.image + '.png"/>';
                html += '</label>';
                html += '<span style="width:300px;left:10px; bottom:40px;">';
                html += '<div class="row">';
                html += '<div class="col-xs-10 col-xs-offset-1">';
                html += itemTooltipTest(itemDisplay);
                html += '<strong>Left-Click to equip</strong>';
                html += '</div></div>';
                html += '</span>' + '</a>';
                html += '<br />' + itemDisplay.shopPrice + ' Gold';
                html += '</div>';
        };

    html += '</div></div></div>';
    if (type === itemShopWeapon) {
        $('#shopWeapon').empty().append(html);
    }
    else if (type === itemShopArmor) {

        $('#shopArmor').empty().append(html);
    }
    else if (type === itemShopAccessory) {

        $('#shopAccessory').empty().append(html);
    }
    ShopBuyButtons();
};

function ShopBuyButtons() {
    var html = '';
    html += '<div class="row">';
    html += '<div class="col-xs-4 col-xs-offset-4">';
    html += '<button type="button" class="shopButton" onclick="itemBuy' + "(" + checkedShopItem + ")" + '">Buy</button>';
    html += '<button type="button" class="shopButton" onclick="rerollShopItems()">Refresh</button>';
    html += '</div>';
    html += '</div>';
    $('.shopItemBuy').empty().append(html);
};

function itemBuy(id) {
    var item = itemShopWeapon.filter(function (obj) {
        return obj.id === id;
    })[0];
    if (item !== undefined) {
        
        if (player.properties.gold - item.shopPrice >= 0) {
            var index = itemShopWeapon.indexOf(item, 0);
            playerInventory.push(item);
            if (index > -1) {
                itemShopWeapon.splice(index, 1);
            };
            displayShopItems(itemShopWeapon);
            weaponAmount--;
        };
        };

        if (item === undefined) {
            item = itemShopArmor.filter(function (obj) {
                return obj.id === id;
            })[0];
            if (item !== undefined) {
                
                if (player.properties.gold - item.shopPrice >= 0) {
                    index = itemShopArmor.indexOf(item, 0);
                    playerInventory.push(item);

                    if (index > -1) {
                        itemShopArmor.splice(index, 1);
                    };
                    displayShopItems(itemShopArmor);
                    armorAmount--;
                };
            };
            if (item === undefined) {
                item = itemShopAccessory.filter(function (obj) {
                    return obj.id === id;
                })[0];
                if (item !== undefined) {
                    
                    if (player.properties.gold - item.shopPrice >= 0) {
                        index = itemShopAccessory.indexOf(item, 0);
                        playerInventory.push(item);

                        if (index > -1) {
                            itemShopAccessory.splice(index, 1);
                        };
                        displayShopItems(itemShopAccessory);
                        accessoryAmount--;
                    };
                };
            };
        };
        if (item !== undefined && player.properties.gold - item.shopPrice >= 0) {
            player.properties.gold -= item.shopPrice;
            document.getElementById("gold").innerHTML = player.properties.gold;
        };
        CreateInventoryWeaponHtml();
    
};


function refillShopInterval() {
    if ((itemShopArmor.length + itemShopAccessory.length + itemShopWeapon.length) < 30) {
        getShopItem();
    };
    setTimeout(refillShopInterval, 10000);
};

function rerollShopItems() {
    itemShopWeapon = [];
    itemShopArmor = [];
    itemShopAccessory = [];
    weaponAmount = 0;
    armorAmount = 0;
    accessoryAmount = 0;
    getShopItem();
};

function shopOther() {
    var html = '';
    html += '<div class="row">';
    html += '<div class="col-xs-12">';
    html += '<div class="row">';
    for (var key in shopOtherList) {
        if (shopOtherList.hasOwnProperty(key)) {
            var itemType = shopOtherList[key];
            var itemTypePrice = itemType.type3;
            html += '<div class="col-xs-12">';
            html += '<div class="c3">';
            html += '<img src=' + itemType.image + ' alt="Buy"><br />';
            html += itemType.type + ' - ' + window[itemTypePrice].price + ' Gold<br />';
            html += '<button type="button" class="buy" onclick="' + itemType.type2 + "(" + 1 + ")" + '">' + "Buy" + '</button>';
            html += '<button type="button" class="buy" onclick="' + itemType.type2 + "(" + 10 + ")" + '">' + "Buy 10" + '</button>';
            html += '<button type="button" class="buy" onclick="' + itemType.type2 + "(" + 100 + ")" + '">' + "Buy 100" + '</button>';
            html += '</div>';
            html += '</div>';
        };
    };
    html += '</div></div></div>';

    $('#shopOther').empty().append(html);
};

var shopOtherList = [
    {
        type: "Stat Points",
        image: "images/stat.png",
        type2: "buyStat",
        type3: "statStatus"
    },
    {
        type: "Backpack",
        image: "images/bag.png",
        type2: "buyBackpack",
        type3: "backpackStatus"
    },
    {
        type: "Small Potion",
        image: "images/smallPotion.png",
        type2: "buySmallPotion",
        type3: "potionStatus"
    },
    {
        type: "Medium Potion",
        image: "images/mediumPotion.png",
        type2: "buyMediumPotion",
        type3: "mediumPotionStatus"
    },
    {
        type: "Super Potion",
        image: "images/superPotion.png",
        type2: "buySuperPotion",
        type3: "superPotionStatus"
    }
];
setTimeout(function () { testss(); }, 3000);
function testss() {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
};

function getAgeButton() {
    var raceSelect = "Adulthood";
    player.properties.raceAge = raceSelect;
        if (document.getElementById("Adulthood").checked === true) {
            raceSelect = "Adulthood";
            player.properties.raceAge = "Adulthood";
        }
        else if (document.getElementById("Middle Age").checked === true) {
            raceSelect = "Middle Age";
            player.properties.raceAge = "Middle-Aged";
        }
        else if (document.getElementById("Old").checked === true) {
            raceSelect = "Old";
            player.properties.raceAge = "Old";
        }
        else if (document.getElementById("Venerable").checked === true) {
            raceSelect = "Venerable";
            player.properties.raceAge = "Venerable";
        };
        getAge(raceSelect);
        characterCreationHtml();
    };
function getAge(raceSelect) {
    characterRaces.human.raceAge = raceSelect;
    characterRaces.halfElf.raceAge = raceSelect;
    characterRaces.dwarf.raceAge = raceSelect;
    characterRaces.orc.raceAge = raceSelect;
    characterRaces.elf.raceAge = raceSelect;
    characterRaces.halfing.raceAge = raceSelect;
    characterRaces.sylph.raceAge = raceSelect;
    characterRaces.giant.raceAge = raceSelect;
};

function itemTooltipTest(item) {
    var html = "";
    var equippedItemStat = equippedItems[item.subType];
    if (item.itemType === "weapon") {
        equippedItemStat = equippedItems[item.itemType];
    };
    html += '<font color="' + item.color + '"><strong>' + item.name + '</strong></font>' + '<br />';
    if (item.itemType === "weapon") {
        html += '<div class="borderBottom borderTop">Weapon class: ' + item.subType.capitalizeFirstLetter() + '<br />';
        if (item['Bonus damage'] > 0) {
            html += '<strong><font color="#2175D9">' + 'Damage: ' + item.MinDamage + " to " + item.MaxDamage + '</font></strong>' + '</div>';
        }
        else {
            html += 'Damage: ' + item.MinDamage + " to " + item.MaxDamage + '</div>';
        };
        html += 'Average Damage: ' + compare(item.AverageDamage, equippedItemStat.AverageDamage, "");
        html += '<div class="borderBottom borderTop">Critical Chance: ' + compare(item['Critical chance'], equippedItemStat['Critical chance'], "%") + '</div>';
    };
    if (item.itemType === "armor") {
        if (item['Bonus armor'] > 0) {
            html += '<div class="borderBottom borderTop"><strong><font color="#1e69c3">Defense: ' + compare(item.defense.toFixed(0), equippedItemStat.defense.toFixed(0), "") + "</font></strong></div>";
        } else {
            html += '<div class="borderBottom borderTop">Defense: ' + compare(item.defense, equippedItemStat.defense, "") + " </div>";
        };
        if (item.subType === "shield") {
            html += '<div class="borderBottom borderTop">Chance to Block: ' + item['Block chance'] + '%' + " </div>";
        };
        if (item['Bonus armor'] > 0) {
            html += '<strong><font color="#7FCC7F">' + 'Bonus armor' + ": " + compare(item['Bonus armor'], equippedItemStat['Bonus armor'], "%") + '</font></strong>' + '<br />';
        };
        html += 'Damage reduction: ' + ((100 - (player.properties.prestigeMultiplier * 500 / (player.properties.prestigeMultiplier * 500 + (player.functions.defense() + (item.defense - equippedItems[item.subType].defense)))) * 100) - (100 - (player.properties.prestigeMultiplier * 500 / (player.properties.prestigeMultiplier * 500 + player.functions.defense())) * 100)).toFixed(2) + "%" + '<br />';
    };
    for (var statName in item) { //Here stat will become the word Defense
        if (item.hasOwnProperty(statName)) {
            if ('All attributes, Strength, Endurance, Agility, Dexterity, Wisdom, Intelligence, Luck, Evasion, Bonus damage, Bonus life, Bonus mana, Health regen, Mana regen, Magic find, Gold drop, Experience rate, Life gain on hit, Critical damage'.indexOf(statName) !== -1) {
                //Getting the actual stat object from the word.
                var selectedStat = item[statName];
                var equippedItemTest = equippedItemStat[statName];
                if (statName === "Bonus damage" || statName === "Magic find" || statName === "Gold drop" || statName === "Experience rate") {
                    if (selectedStat > 0) {
                        html += '<strong><font color="#0066FF">' + statName + ": " + compare(selectedStat, equippedItemTest, "%") + '</font></strong>' + '<br />';
                    }
                    if (selectedStat === 0 && equippedItemTest > 0) {
                        html += '<strong><font color="#0066FF">' + statName + ": " + compare(selectedStat, equippedItemTest, "%") + '</font></strong>' + '<br />';
                    }
                }
                else {
                    if (selectedStat > 0) {
                        html += '<strong><font color="#0066FF">' + statName + ": " + compare(selectedStat, equippedItemTest, "") + '</font></strong>' + '<br />';
                    }
                    if (selectedStat === 0 && equippedItemTest > 0) {
                        html += '<strong><font color="#0066FF">' + statName + ": " + compare(selectedStat, equippedItemTest, "") + '</font></strong>' + '<br />';
                    }
                };
            };
        };
    };
    html += '<div class="borderBottom borderTop">';
    html += "Value: " + item.Value + " gold<br />";
    html += 'Item level: ' + item.iLvl + '<br />';
    html += '<font color="#CC6633">' + item.lore + '</font>';
    html += '</div>';
    return html;
};

function itemTooltipTest2(item) {
    var html = '';
    html += '<font color="' + item.color + '"><strong>' + item.name + '</strong></font>' + '<br />';
    if (item.itemType === "weapon") {
        html += '<div class="borderBottom borderTop">Weapon class: ' + item.subType.capitalizeFirstLetter() + '<br />';
        if (item['Bonus damage'] > 0) {
            html += '<strong><font color="#2175D9">' + 'Damage: ' + item.MinDamage + " to " + item.MaxDamage + '</font></strong>' + '</div>';
        }
        else {
            html += 'Damage: ' + item.MinDamage + " to " + item.MaxDamage + '</div>';
        };
        html += '<div class="borderBottom borderTop">Critical Chance: ' + item['Critical chance'] + '%' + '</div>';
    };
    if (item.itemType === "armor") {
        if (item['Bonus armor'] > 0) {
            html += '<div class="borderBottom borderTop"><strong><font color="#1e69c3">Defense: ' + item.defense.toFixed(0) + "</font></strong></div>";
        } else {
            html += '<div class="borderBottom borderTop">Defense: ' + item.defense + " </div>";
        };
        if (item.subType === "shield") {
            html += '<div class="borderBottom borderTop">Chance to Block: ' + item['Block chance'] + '%' + " </div>";
        };
        if (item['Bonus armor'] > 0) {
            html += '<strong><font color="#7FCC7F">' + 'Bonus armor' + ": " + item['Bonus armor'] + "%" + '</font></strong>' + '<br />';
        };
        html += 'Damage reduction: ' + ((100 - (player.properties.prestigeMultiplier * 500 / (player.properties.prestigeMultiplier * 500 + (player.functions.defense() + (item.defense - equippedItems[item.subType].defense)))) * 100) - (100 - (player.properties.prestigeMultiplier * 500 / (player.properties.prestigeMultiplier * 500 + player.functions.defense())) * 100)).toFixed(2) + "%" + '<br />';
    };
    for (var statName in item) { //Here stat will become the word Defense
        if (item.hasOwnProperty(statName)) {
            if ('All attributes, Strength, Endurance, Agility, Dexterity, Wisdom, Intelligence, Luck, Evasion, Bonus damage, Bonus life, Bonus mana, Health regen, Mana regen, Magic find, Gold drop, Experience rate, Life gain on hit, Critical damage'.indexOf(statName) !== -1) {
                //Getting the actual stat object from the word.
                var selectedStat = item[statName];
                if (selectedStat > 0 && statName === "Bonus damage") {
                    html += '<strong><font color="#7FCC7F">' + statName + ": " + selectedStat + '%</font></strong>' + '<br />';
                }
                else if (selectedStat > 0 && statName === "Magic find" || selectedStat > 0 && statName === "Gold drop" || selectedStat > 0 && statName === "Experience rate") {
                    html += '<strong><font color="#0066FF">' + statName + ": " + selectedStat + '%</font></strong>' + '<br />';
                } else if (selectedStat > 0) {
                    html += '<strong><font color="#0066FF">' + statName + ": " + selectedStat + '</font></strong>' + '<br />';
                };
            };
        };
    };
    html += '<div class="borderBottom borderTop">';
    html += "Value: " + item.Value + " gold<br />";
    html += 'Item level: ' + item.iLvl + '<br />';
    html += '<font color="#CC6633">' + item.lore + '</font>';
    html += '</div>';
    return html;
};

function activeBuffsHtml() {
    var html = "";
    html += '<div class="row">';
    html += '<div class="col-xs-10 col-xs-offset-1">';
    html += '<div class="row">';
    for (var key in player.buffs) {
        if (player.buffs.hasOwnProperty(key)) {
            if (player.buffs[key].timer > 0) {
                html += '<div class="col-xs-2">';
                var buff = player.buffs[key];
                if (buff.amount > 0) {
                    html += '<img src="images/buffs/' + key + '.png" data-toggle="tooltip" data-placement="right" title="' + key + ' ' + (buff.amount * 100) + '%' + '">';
                    html += ' <br /> ' + buff.timer + ' turns';
                };
                html += '</div>';
            };
        };
    };
    html += '</div>';
    html += '</div>';
    html += '</div>';
    document.getElementById('activeBuffs').innerHTML = html;
    updateHtml();
};

function getMonsterTooltip(monster) {
    var html = "";
    html += '<b>' + monster.displayName + '</b>';
    html += '<br />'
    html += 'Level: ' + monster.level
    html += '<br />'
    html += 'Dmg: ' + getThousands(monster.minDmg()) + " - " + getThousands(monster.maxDmg())
    html += '<br />'
    html += 'Def: ' + getThousands((monster.def() * player.functions.ignoreDefense()));
    if (player.functions.ignoreDefense() < 1) {
        html += '(Ignored ' + (100 - (100 * player.functions.ignoreDefense())) + "%" + ')';
    }
    return html;
};
