
const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const fs = require('fs');
const moment = require('moment');
const robot = new Discord.Client();
const user = new Discord.ClientUser();
var date = new Date(); // Создаем дату
  //date.setUTCHours(16);

robot.login(process.env.BOT_TOKEN);

robot.on('ready', () => {

  console.log("Стартуем!!!");

robot.user.setStatus('dnd');

robot.user.setGame('GTA 7', 'https://twitch.tv/vk.com/megabotds');

}); // ready

robot.on("guildMemberAdd", function(member) { try {

var defaultChannelId = member.guild.systemChannelID;

member.guild.channels.find("id", defaultChannelId).send(`${member.toString()} Добро пожаловать на сервер: ${member.guild.name}`); }

catch (error) { console.log(error); }


}); // guildMemberAdd

robot.on('guildMemberRemove', member => { try {

  var defaultChannelId = member.guild.systemChannelID;

  member.guild.channels.get(defaultChannelId).send(`Внимание! Пачимута ${member.user.tag} пакинул этот сервер. Счастливого пути!`); }

  catch (error) { console.log(error); }

}); // guildMemberRemove

robot.on('message', async msg => { 

    sender = msg.author;
    sms = msg.content;
    prefix = "!";
    sayPrefix = ".";

    if (msg.author.bot) return;

    function KickForSpam() { var thisAuthor = msg.guild.members.find('id', msg.author.id)

      if (msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR')) return;

      if (sms.includes("discord.gg")) {

       if (msg.guild.member(thisAuthor).kickable) {
         if (msg.author.lastMessage.deletable) { msg.author.lastMessage.delete(1); }
         msg.guild.member(thisAuthor).kick("Возможно реклама другого сервера в Дискорде.");
         msg.channel.send(`:chicken: Данный (${msg.author.tag}) человек был кикнут мною по причине: Возможно реклама другого сервера в Дискорде.`);
       }

      }

    } KickForSpam();



/////////////////////////////////////////////////////////////////
//                                                             //
//                                                             //
//                     ADMIN   COMMANDS                        //
//                                                             //
//                                                             //
/////////////////////////////////////////////////////////////////

if (!msg.content.startsWith(`${prefix}`)) return;

if (msg.content.startsWith(`${prefix}addtobase`)) { var thisAuthor = msg.guild.members.find('id', msg.author.id);

if (msg.author.id != 315174672356343808) return; 

  smskaEdits = msg.content.replace(`${prefix}addtobase`, "");
  //smskaEdits = smskaEdits.replace(/\s/g, " ");
  smskaEdits = smskaEdits.split('_');
  smskaEdits2 = smskaEdits[0].toLowerCase().slice(1);
  smskaEdits2_1 = smskaEdits[1];
 
  var dataBaseSplit = dataBase.toString().split("\n");
  var getSize = dataBaseSplit.length;
  var getSize2 = getSize;

  fs.appendFile('jsons/DataBase.txt', `\n${smskaEdits2}\\${smskaEdits2_1}`, (err) => {
    if (err) console.error(err); });

    msg.reply(`В базу ответов добавлено сообщение: ${smskaEdits[0]}\n\nОтвет: ${smskaEdits[1]}\n\nВсего ответов в базе: ${dataBaseSplit.length}`);

  }


 // !cmd

if (sms == `${prefix}cmd`) { var thisAuthor = msg.guild.members.find('id', msg.author.id);

if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR') && msg.author.id != 315174672356343808)

return msg.reply(":no_entry: Вы не являетесь администратором на этом сервере! Данная команда не доступна.:no_entry: "); 

  const m = await msg.channel.send("SECRET..");

let embed = new Discord.RichEmbed().setAuthor("Команды спешл фор админс")
.setDescription("Ток использовать с умом!")
.addField("!cmd", "Список всех команд ! ДЛЯ АДМИНИСТРАТОРОВ !")
.addField("!admin", "Проверка на роль ADMINISTRATOR'a")
.addField("!создать канал Имя text || voice Причина", "Создаст канал")
.addField("!удалить канал Имя Причина", "Удалит канал")
.addField("!очистка [сколько сообщений]", "Очистит чат")
.setThumbnail("https://cdn.discordapp.com/avatars/441934736957636619/fce94b2b931af895d1fe09ea13997037.png?size=512")
.setColor("#ff0000");

m.edit(embed);

  } 

// !создать канал

if (sms.startsWith(`${prefix}создать канал`)) { var thisAuthor = msg.guild.members.find('id', msg.author.id);

if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR') && msg.author.id != 315174672356343808)

return msg.reply(":no_entry: Вы не являетесь администратором на этом сервере! Данная команда не доступна.:no_entry: "); 

  conteiner = msg.content; 
  conteiner = conteiner.replace("!создать канал", "");
  conteiner = conteiner.replace(/\s/g, " ");
  conteiner = conteiner.split(' ', 3);

  if (conteiner[2] != "text" && conteiner[2] != "voice") conteiner[2] = "";

  if (conteiner[1] == "" || conteiner[2] == "" || conteiner[3] == "") {
  msg.reply(`:name_badge: Канал не был создан, по скольку ты допустил где-то ошибку!`);
  } else {

    try {
      msg.guild.createChannel(conteiner[1], conteiner[2], undefined, conteiner[4]);

      msg.channel.bulkDelete(1);

      msg.reply(`:white_check_mark: Создан канал со следующими параметрами:\n\nИмя канала: ${conteiner[1]}\nКатегория: ${conteiner[2]}\nПрава: null\nПричина: ${conteiner[4]}`);
    } catch (error) {
        msg.reply(`:name_badge: Ошибка. Скорее всего недостаточно прав.`);
      }
   } 
} 

// !удалить канал

if (sms.startsWith(`${prefix}удалить канал`)) {var thisAuthor = msg.guild.members.find('id', msg.author.id);

if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR') && msg.author.id != 315174672356343808)

return msg.reply(":no_entry: Вы не являетесь администратором на этом сервере! Данная команда не доступна.:no_entry: "); 

  conteiner2 = msg.content.replace("!удалить канал", "");
  conteiner2 = conteiner2.replace(/\s/g, " ");
  conteiner2 = conteiner2.split(' ', 3);

  if (conteiner2[1] == "" || conteiner2[2] == "") {
  return msg.reply(`:name_badge: Канал не был удален, по скольку ты не ввел имя или причину.`);
  } else {

    try {
      msg.guild.channels.find('name', conteiner2[1]).delete(conteiner2[2]);

      msg.channel.bulkDelete(1);

      msg.reply(`:white_check_mark: Канал ${conteiner2[1]} был удален по причине: ${conteiner2[2]}.`);
    } catch (error) {
      msg.reply(`:name_badge: Ошибка. Скорее всего недостаточно прав, или канал не найден.`);
    }
   } 
} 

// !рассылка

if (sms.startsWith(`${prefix}рассылка`)) { var thisAuthor = msg.guild.members.find('id', msg.author.id);

if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR') && msg.author.id != 315174672356343808)

return msg.reply(":no_entry: Вы не являетесь администратором на этом сервере! Данная команда не доступна.:no_entry: "); 

  txt = sms.replace("!рассылка", "");
  
  msg.author.send(`Здарова! Это тест рассылки!`);

 }

 // !aplay

if (sms.startsWith(`${prefix}aplay`)) { 
  aplay = msg.content.replace("!aplay", "");
  aplay = aplay.replace(/\s/g, " ");
  aplay = aplay.split(' ', 3);

  try {
  msg.member.voiceChannel.join().then(connection => {
    // You can play a file or a stream here:
    aplay[1] = aplay[1] + ".mp3";
    msg.channel.bulkDelete(1);
    const dispatcher = connection.playFile(aplay[1]);
  }); } catch (error) {console.log(error);}

 }

  // !ttests

if (sms.startsWith(`${prefix}000`)) { 

  var shablonizatorSplit = shablonizator.toString().split("\n");
  var shablonizatorSplit2 = shablonizatorSplit[1].split(" ");
  var shablonizatorSplit3 = shablonizatorSplit2;

  msg.channel.send(`${shablonizatorSplit3[0]}`);

 }

 // !ban

if (sms.startsWith(`${prefix}ban`)) { var thisAuthor = msg.guild.members.find('id', msg.author.id);

if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR') && msg.author.id != 315174672356343808)

return msg.reply(":no_entry: Вы не являетесь администратором на этом сервере! Данная команда не доступна.:no_entry: "); 

  wId = msg.content.replace("!ban", "");
  wId = wId.replace(/\s/g, " ");
  wId = wId.split(' ', 3);

  if (wId[1] == "") {
  return msg.reply(`:name_badge: Невозможно найти человека, имя не верное.`);
  } else {

    try {

      var role = msg.guild.roles.find('name', "ЗАБОНЕННЫЙ ПОЦ");

      if (role == null || role == "" || role == undefined) return msg.reply(`:name_badge: Ошибка. Роли (ЗАБОНЕННЫЙ ПОЦ) нет на вашем сервере. Создайте ее, и тогда команда будет работать.\n
      В правах роли запретите делать все, кроме просмотра текстовых каналов. !Название роли должно совпадать!`);;

      msg.guild.members.find('id', wId[1]).addRole(role, wId[2]);

      msg.channel.bulkDelete(1);

      msg.reply(`:white_check_mark: Пользователь (${wId[1]}) был добавлен в черный список по причине: ${wId[2]}`);
    } catch (error) { console.log(error);
      msg.reply(`:name_badge: Ошибка. Скорее всего недостаточно прав, или вы указали не верный айди.\n\nАйди можно узнать так: ПКМ на пользователя => Копировать ID\n\n!ban id причина.`);
    }
   } 
} 

// !admin

if (sms.startsWith(`${prefix}admin`)) {var thisAuthor = msg.guild.members.find('id', msg.author.id);

if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR') && msg.author.id != 315174672356343808)

return msg.reply(":no_entry: Вы не являетесь администратором на этом сервере! Данная команда не доступна.:no_entry: "); 

  var thisAuthor = msg.guild.members.find('id', msg.author.id);

  if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR')) return msg.reply('Ты не админ на сервере :/');

  msg.reply('Ты админ на сервере, да, вижу!');

   }

// !очистка

   if (sms.startsWith(`${prefix}очистка`)) { var thisAuthor = msg.guild.members.find('id', msg.author.id);

   if (!msg.guild.member(thisAuthor).hasPermission('ADMINISTRATOR') && msg.author.id != 315174672356343808)
   
   return msg.reply(":no_entry: Вы не являетесь администратором на этом сервере! Данная команда не доступна.:no_entry: "); 

    intDelSms = 0;
  
    intDelSms = sms.replace("!очистка", "");

    try {
    if (intDelSms <= 0) { return msg.reply(":name_badge: Ты ввел меньше 1! Так низя."); }

    else { msg.channel.bulkDelete(++intDelSms);
    
    } 
  } catch (error) { msg.reply(":name_badge: Ты ввел не число, засранец!"); } }

  // !setmoney

  if (sms.startsWith(`${prefix}setmoney`)) { 

    if (msg.author.id != 315174672356343808) return;

    binTxt2 = msg.content.replace("!setmoney", "");
    binTxt2 = binTxt2.replace(/\s/g, " ");
    binTxt2 = binTxt2.split(' ', 3);

    try {

      if(binTxt2[1] == null || binTxt2[1] == undefined || binTxt2[1] == "") return msg.reply(":name_badge: Не указан айди.");
      if(binTxt2[2] == null || binTxt2[2] == undefined || binTxt2[2] == "") return msg.reply(":name_badge: Не указана сумма.");

       if (binTxt2[1] == "me") {
        binaryGame[sender.id].balance = parseInt(binTxt2[2]); msg.reply(`:white_check_mark: Ваш баланс установлен: ${binaryGame[sender.id].balance}`);
       } else {
        binaryGame[binTxt2[1]].balance = parseInt(binTxt2[2]); msg.reply(`:white_check_mark: Баланс ${binTxt2[1]} установлен: ${binaryGame[binTxt2[1]].balance}`);
       }

       fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
        if (err) console.error(err);
      });
       
  } catch (error) { msg.reply(error); } } //":name_badge: Error!"



/////////////////////////////////////////////////////////////////
//                                                             //
//                                                             //
//                     USER   COMMANDS                         //
//                                                             //
//                                                             //
/////////////////////////////////////////////////////////////////     

// !команды

if (sms == `${prefix}команды`) {

  const m = await msg.channel.send("Погодь..");

let embed = new Discord.RichEmbed().setAuthor("Вот тебе маи команды")
.setDescription("Команды MegaБот'а")
.addField("!команды", "Список всех команд")
.addField("!cmd", "Список всех команд ! ДЛЯ АДМИНИСТРАТОРОВ !")
.addField("!ава", "Скинет вашу аву")
.addField("!аноним айди сообщение", "Система отправки анонимных сообщений через Бота (Айди узнавать по ПКМ на пользователя => Копировать ID)")
.addField("!инфа", "Скинет инфу про ваш Дискордный Аккаунт")
.addField("!когда text", "Попробует угадать когда случится событие")
.addField("!время", "Покажет точное время по МСК + День/Месяц/Год")
.addField("!или Водка или Пиво", "Поможет с выбором")
.addField("!рандом число1 число2", "Сгенирирует рандомное число в вашем диапазоне")
.addField("!скажи text", "Повторит за вами текст")
.addField("!сервер", "Покажет информацию о данном сервере")
//.addField("!музыка", "Все команды для воспроизведения музыки")
.addField("Контакты разработчика: ", "[Группа ВКонтакте]: (https://vk.com/megabotds)")
.setThumbnail("https://cdn.discordapp.com/avatars/441934736957636619/fce94b2b931af895d1fe09ea13997037.png?size=512")
.setColor("#ffff00");

m.edit(embed);

  } 
  
// !тест

    if (sms == `${prefix}тест`) {

    msg.reply("Я работаю, фсе норм!");

    }
      
// !ава

    if (sms == `${prefix}ава`) {

        msg.reply(msg.author.avatarURL);
      }
        
// !инфа

      if (sms == `${prefix}инфа`) {

        const m = await msg.channel.send("Погодь..");

        pingS = m.createdTimestamp - msg.createdTimestamp;

     let embed = new Discord.RichEmbed().setAuthor("Ответец")
     .setDescription("Информация о вашем аккаунте")
     .addField("Ваш настоящий ник: ", msg.author.username)
     .addField("Ваш дискриминатор: ", msg.author.discriminator)
     .addField("Дата создания аккаунта: ", msg.author.createdAt)
     .addField("Ваш id: ", msg.author.id)
     .setThumbnail(msg.author.avatarURL)
     .setColor("#ff44ff");

      m.edit(embed);

    }
  
// !сколько

    if (sms.startsWith(`${prefix}сколько`)) {
        str = msg.content.replace("!сколько", "");
        str = str.replace(/\s/g, "");
                msg.reply('Символов в твоем тексте ровно вот столько: ' + str.length);
      }
  
// !скажи

      if (sms.startsWith(`${prefix}скажи`)) {
        str2 = sms.replace("!скажи", "");

        msg.channel.bulkDelete(1);

        if (error) console.log(error);

        msg.channel.send(str2);
      }

// !рандом

    if (msg.content.startsWith(`${prefix}рандом`)) {

      rand = msg.content.replace("!рандом", "");
      rand = rand.replace(/\s/g, " ");
      rand = rand.split(' ', 3);

       minN = rand[1];
       maxN = rand[2];

      num = Math.random() * (maxN - minN) + minN;

      if (isNaN(num)) return msg.reply("Введите правильно команду! Пример: !рандом 1 100");

        msg.reply("Тебе короч выпало вот такое число: " + Math.round(num));
      }
  
// !сервер

function FindAllRols() {
  var rolesList = [];
  for(var i = 0; i <= msg.guild.roles.size; i++) {
    rolesList += msg.guild.roles.findAll("calculatedPosition", i) + " ";
  }
  return `${rolesList}`;
}

       if (sms == `${prefix}сервер`) {

        const m2 = await msg.channel.send("Погодь..");

     let embed2 = new Discord.RichEmbed().setAuthor("Ответец")
     .setDescription("Информация о данном сервере")
     .addField("Создан: ", msg.guild.createdAt)
     .addField("ID сервера: ", msg.guild.id)
     .addField("Имя сервера: ", msg.guild.name)
     .addField("Создатель сервера: ", msg.guild.owner)
     .addField("ID создателя сервера: ", msg.guild.ownerID)
     .addField("АФК канал: ", msg.guild.afkChannel)
     .addField("Макс. вермя АФК: ", `${msg.guild.afkTimeout / 60} минут.`)
     .addField("Количество людей на сервере: ", msg.guild.memberCount)
     .addField("Роль по умолчанию: ", msg.guild.defaultRole)
     .addField("Список ролей сервера: ", "Всего ролей: " + msg.guild.roles.size +" \n"+"Роли: "+FindAllRols())
     .setThumbnail("http://globalcs.ru/uploads/posts/2015-09/1442814842_12705367.png")
     .setColor("#000000");

      m2.edit(embed2);

       }

  // !аноним

  if (sms.startsWith(`${prefix}аноним`)) { try {

     anonimStr = sms.replace("!аноним", "");
     anonimStr = anonimStr.replace(/\s/g, " ");
     var anonimId = anonimStr.split(' ', 2);
     anonimStr = anonimStr.replace(anonimId[1], "");
     var poluchatel = anonimId[1];

     if (poluchatel != "" && poluchatel != undefined && anonimStr != "" && anonimStr != undefined) {

     msg.channel.bulkDelete(1);

     if (msg.guild.members.find('id', poluchatel) == null || msg.guild.members.find('id', poluchatel) == "") return msg.author.send(':name_badge: Ошибка отправки анонимного сообщения. Скорее всего айди указан не верно, или человека нет на вашем сервере..');

     msg.author.send(`**Ваше анонимное сообщение успешно отправлено.**\n\n :spy: Получатель: ${msg.guild.members.find('id', poluchatel)}\n\n :incoming_envelope: Сообщение: ${anonimStr}`);

    var anonimUser = msg.guild.members.find('id', poluchatel);
    msg.guild.member(anonimUser).send(`:spy: **Вы получили анонимное сообщение. Нет никакого смысла мне на него отвечать, ибо я просто Бот :)** :spy: \n\n :envelope_with_arrow: ${anonimStr}`);

     } else { return msg.reply(':name_badge: Ты допустил где-то ошибку. Пример ввода команды: !аноним 442329952386547723 Сообщение');}
    } catch (error) {return msg.reply(':name_badge: Неизвестная ошибка. Айди или сообщение указаны не верно.');}
  }

    
// !ttest

if (sms.startsWith(`${prefix}ttest`)) {
  //str2 = sms.replace("!скажи", "");

 // msg.channel.send(msg.guild.roles.findAll("calculatedPosition", i));
}

// !когда

if (sms.startsWith(`${prefix}когда`)) {
  whenRandMsg = msg.content.replace("!когда", "");
  whenRandMsg = whenRandMsg.replace(/\s/g, " ");

  var mindays = 1, maxdays = 300;
  var minnedils = 1, maxnedils = 4;
  var minmonth = 1, maxmonth = 12;
  var minyears = 1, maxyears = 999;

  var randOtvetKogda = Math.round(Math.random() * (5 - 1) + 1);

  switch (randOtvetKogda) {

  case 1: var randDays = Math.round(Math.random() * (maxdays - mindays) + mindays);
  msg.reply(`думаю это случится через ${randDays} дней.`);
  break;
  case 2: var randNedils = Math.round(Math.random() * (maxnedils - minnedils) + minnedils);
  msg.reply(`наверное это произойдет через ${randNedils} недели.`);
  break;
  case 3: var randMonth = Math.round(Math.random() * (maxmonth - minmonth) + minmonth);
  msg.reply(`я не экстрасенс, но наверное это будет через ${randMonth} месяца.`);
  break;
  case 4: var randYears = Math.round(Math.random() * (maxyears - minyears) + minyears);
  msg.reply(`ждать тебе еще долго.. Целых ${randYears} года.`);
  break;
  case 5:
  msg.reply("Наверное этого не случится никогда..");
  break;

  }

}

// !или

if (sms.startsWith(`${prefix}или`)) {
  ili = msg.content.replace("!или", "");
  ili = ili.replace(/\s/g, " ");
  ili = ili.split(" ");

if (ili[2] != "или") return msg.reply("Ошибка. Пример команды: !или Собака или Кот");


var rand = Math.round(Math.random() * (3 - 1) + 1);

switch (rand) {

  case 1: msg.channel.send("Думаю я бы выбрал: " + ili[1]);
  break;
  case 2: msg.channel.send("Думаю я бы выбрал: " + ili[3]);
  break;
  case 3: msg.channel.send("Думаю я бы ничего из этого не выбрал..");
  break;

 }

}

// !кто

if (sms.startsWith(`${prefix}кто`)) {
  who = msg.content.replace("!кто", "");
  who = who.replace(/\s/g, " ").toString();
  who = who.replace("?", "");

var membersList = msg.guild.members.array().length;

var randPerson = Math.round(Math.random() * (membersList - 0) + 0);

var randomPersona = msg.guild.members.array().toString().split(",");

msg.channel.send(`Я думаю, что именно --> ${randomPersona[randPerson]} - ${who}`);

}

// !время

function Time() { //Powered by Yaroslav Andreev - Время + Дата

  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ + (/* UTC+8 */ 3) * 60 * 60 * 1000);
  //msg.reply("Time: " + date);
 // date.setUTCHours(11);
  
  var hour = date.getHours(); // Часы
  
  if (hour < 10) hour = "0" + hour; 
  
  
  var min = date.getMinutes(); // Минуты
  
  if (min < 10) { min = "0" + min; }
  
  
  var sec = date.getSeconds(); // Секунды
  
  if (sec < 10) sec = "0" + sec;
  
  
  var mDay = date.getDate(); // Число
  
  if (mDay < 10) mDay = "0" + mDay;
  
  
  var month = date.getMonth(); // Месяц
  
  month++;
  
  if (month < 10) month = "0" + month;
  
  
  var enterDate = "Время: " + hour +":"+ min +":"+ sec + " | Дата: " + mDay +"."+ month +"."+ date.getFullYear();

  msg.channel.send(enterDate);
  
  };

  if (sms.startsWith(`${prefix}время`)) {
  
  Time();
  
  }


 });

//.addField(".readyAt", msg.client.readyAt) .addField(".browser", msg.client.browser)
//embed "[add link btn] (youtube.com)"
