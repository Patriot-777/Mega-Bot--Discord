
const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const fs = require('fs');
const moment = require('moment');
const robot = new Discord.Client();
const user = new Discord.ClientUser();

var binaryGame = JSON.parse(fs.readFileSync('jsons/binaryGame.json', 'utf8'));
var usersInventar = JSON.parse(fs.readFileSync('jsons/usersInventar.json', 'utf8'));

function bGauto() {
  if (!binaryGame[sender.id]) binaryGame[sender.id] = {
    balance: 5
  } 

  fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
    if (err) console.error(err);
  });
}

function uIauto() {
  if (!usersInventar[sender.id]) usersInventar[sender.id] = {
    pass: 'Отсутствует',
    lic: 'Отсутствует',
    blatGibdd: 'Отсутствует',
    car: 'Отсутствует',
    uchastok: 'Отсутствует',
    house: 'Отсутствует',
    heli: 'Отсутствует',
    goldBaton: 'Отсутствует',
    yahta: 'Отсутствует',
    ostrov: 'Отсутствует',
    zvezda: 'Отсутствует'
  };
}

  function bonusauto() {
    if (!binaryGame[sender.id].bonus) binaryGame[sender.id].bonus = 'Не получен';

  fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
    if (err) console.error(err);
  });
}

 // начало

function play(connection, msg) {

  var server = servers[msg.guild.id];
  
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() {

   if (server.queue[0]) play(connection, msg);
   else connection.disconnect();

  });
  
  } // конец функции play
  
var servers = {};

robot.login(process.env.BOT_TOKEN);

robot.on('ready', () => {

  console.log("Стартуем!!!");

robot.user.setStatus('dnd');

robot.user.setGame('GTA 7', 'https://twitch.tv/шутка');

}); // ready

robot.on("guildMemberAdd", function(member) { try {

var defaultChannelId = member.guild.systemChannelID;

member.guild.channels.find("id", defaultChannelId).send(`${member.toString()} Добро пожаловать на сервер, ${member.guild.name}`); }

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

    if (!msg.content.startsWith("!")) return;

    if (msg.author.bot) return;

/////////////////////////////////////////////////////////////////
//                                                             //
//                                                             //
//                     ADMIN   COMMANDS                        //
//                                                             //
//                                                             //
/////////////////////////////////////////////////////////////////


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

 // !ttests

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
//                     games   COMMANDS                        //
//                                                             //
//                                                             //
///////////////////////////////////////////////////////////////// 

// !игры 

if (sms == `${prefix}игры`) {

  const binaryStartTable = await msg.channel.send("Loading..");

 let binaryTable = new Discord.RichEmbed().setAuthor("Игры Mega Bot'a")
 .setDescription(":video_game: Список игр:")
 .addField("!игры бин", "Бин Опцион", true)
 .addField("!игры кнб", "Камень, ножницы, бумага", true)
 .addField("!бонус", "Бонус, который можно использовать каждый час")
 .addField("!магазин", "Игровой магазин", true)
 .addField("!инвентарь", "Ваш инвентарь", true)
 .setThumbnail("https://articles-images.sftcdn.net/wp-content/uploads/sites/8/2013/10/iStock_000018521171Small-664x374.jpg")
 .setColor("#ffae00");

 binaryStartTable.edit(binaryTable);

  msg.reply("Для перехода в магазин используй: !магазин");
 }

 
       // !магазин

       if (sms == `${prefix}магазин`) {

       uIauto();

        const shopStartTable = await msg.channel.send("Loading..");
      
       let shopTable = new Discord.RichEmbed()
       .setDescription('Список вещичек для покупки:')
       .addField("Паспорт[1]: ", "Цена: 10 бит")
       .addField("Права[2]: ", "Цена: 25 бит")
       .addField("Блат в ГИБДД[3]: ", "Цена: 50 бит")
       .addField("Машина[4]: ", "Цена: 100 бит")
       .addField("Участок земли[5]: ", "Цена: 500 бит")
       .addField("Дом[6]: ", "Цена: 1.000 бит")
       .addField("Вертолет[7]: ", "Цена: 15.000 бит")
       .addField("Золотой батон[8]: ", "Цена: 15.000 бит")
       .addField("Яхта[9]: ", "Цена: 50.000 бит")
       .addField("Остров[10]: ", "Цена: 100.000 бит")
       .addField("Звезда в космосе[11]: ", "Цена: 1.000.000 бит")
       .addField("!купить [n'предмета]", "Купить вещичку", true)
       .addField("!продать [n'предмета]", "Продать вещичку", true)
       .setThumbnail("https://res.cloudinary.com/fleetnation/image/private/c_fill,g_center,h_640,w_640/v1475589742/elaczf36nus8g91fwqaz.jpg")
       .setColor("#58a811");
      
       shopStartTable.edit(shopTable);
      
        msg.reply("Для просмотра списка ваших вещей, используй: !инвентарь");
       }

       // !инвентарь

       if (sms == `${prefix}инвентарь`) {

        uIauto();

        var inv = usersInventar[sender.id];

        const binfoStartTable = await msg.channel.send("Loading..");
      
       let binfoTable = new Discord.RichEmbed().setAuthor(`Имущество ${msg.author.username}`)
       .setDescription('Список ваших вещей:')
       .addField(":notebook_with_decorative_cover: Паспорт: ", inv.pass, true)
       .addField(":clipboard: Права: ", inv.lic, true)
       .addField(":slot_machine: Блат ГИБДД: ", inv.blatGibdd, true)
       .addField(":race_car: Машина: ", inv.car, true)
       .addField(":park: Участок: ", inv.uchastok, true)
       .addField(":house: Дом: ", inv.house, true)
       .addField(":helicopter: Вертолет: ", inv.heli, true)
       .addField(":crown: Золотой батон: ", inv.goldBaton, true)
       .addField(":speedboat: Яхта: ", inv.yahta, true)
       .addField(":island: Остров: ", inv.ostrov, true)
       .addField(":stars: Звезда: ", inv.zvezda, true)
       .setThumbnail(msg.author.avatarURL)
       .setColor("#e38b27");
      
       binfoStartTable.edit(binfoTable);
      
        //msg.reply("");
       }

       // !купить [n'предмета]

      if (sms.startsWith(`${prefix}купить`)) {

        buyTxt = msg.content.replace("!купить", "");
        buyTxt = buyTxt.replace(/\s/g, "");

        //if (buyTxt != nu) return msg.reply(":name_badge: Ты ввел не число!");

      try {

        bGauto();
        uIauto();

        switch(buyTxt) {
          case "1": 
          if (binaryGame[sender.id].balance < 10) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].pass = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 10;
         
          usersInventar[sender.id].pass = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Паспорт_], поздравляю!");

          break;

          case "2": 
          if (binaryGame[sender.id].balance < 25) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].lic = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 25;
          usersInventar[sender.id].lic = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Права_], поздравляю!");

          break;

          case "3": 
          if (binaryGame[sender.id].balance < 50) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].blatGibdd = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 50;
         
          usersInventar[sender.id].blatGibdd = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Блат в ГИБДД_], поздравляю!");

          break;

          case "4": 
          if (binaryGame[sender.id].balance < 100) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].car = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 100;
         
          usersInventar[sender.id].car = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Машину_], поздравляю!");

          break;

          case "5": 
          if (binaryGame[sender.id].balance < 500) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].uchastok = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 500;
         
          usersInventar[sender.id].uchastok = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Участок земли_], поздравляю!");

          break;

          case "6": 
          if (binaryGame[sender.id].balance < 1000) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].house = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 1000;
         
          usersInventar[sender.id].house = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Дом_], поздравляю!");

          break;

          case "7": 
          if (binaryGame[sender.id].balance < 15000) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].heli = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 15000;
         
          usersInventar[sender.id].heli = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Вертолет_], поздравляю!");

          break;

          case "8": 
          if (binaryGame[sender.id].balance < 15000) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].goldBaton = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 15000;
         
          usersInventar[sender.id].goldBaton = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Золотой батон_], поздравляю!");

          break;

          case "9": 
          if (binaryGame[sender.id].balance < 50000) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].yahta = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 50000;
         
          usersInventar[sender.id].yahta = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Яхту_], поздравляю!");

          break;

          case "10": 
          if (binaryGame[sender.id].balance < 100000) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].ostrov = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 100000;
         
          usersInventar[sender.id].ostrov = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Остров_], поздравляю!");

          break;

          case "11": 
          if (binaryGame[sender.id].balance < 1000000) return msg.reply(":name_badge: У тебя недостаточно биткоинов для покупки!");
          if (usersInventar[sender.id].zvezda = 'Есть') return msg.reply(":name_badge: У тебя уже есть эта вещь. Чекни !инвентарь");
          binaryGame[sender.id].balance = binaryGame[sender.id].balance - 1000000;
         
          usersInventar[sender.id].zvezda = 'Есть';

          msg.reply(":white_check_mark:Ты успешно купил себе [_Звезду в космосе_], поздравляю!");

          break;

          default:
          msg.reply(":name_badge: Ошибка. Список предметов и их номера можно узнать прописав: !магазин");
          break;
        }

      } catch (error) {

        msg.reply(":name_badge: Ошибка. Пример ввода: !купить 6 (то есть дом)");

      }

      fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
        if (err) console.error(err);
      });

      fs.writeFile('jsons/usersInventar.json', JSON.stringify(usersInventar), (err) => {
        if (err) console.error(err);
      });

       }

       // !бонус

       if (sms == `${prefix}бонус`) {

       bonusauto();

       if (binaryGame[sender.id].bonus != moment().format('L')) {
        binaryGame[sender.id].bonus = moment().format('L');
        binaryGame[sender.id].balance += 1000;

        msg.reply(':white_check_mark:Вы использовали бонус! Вам начислено: 1000 биткоинов');
       } else {
        msg.reply(`:name_badge: Вы уже использовали в этом часе бонус! До разблокировки бонуса осталось: ${moment().endOf('day').fromNow()}`);
       }

       fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
        if (err) console.error(err);
      });

       }      

      // !игры бин

      if (sms == `${prefix}игры бин`) {

        const binaryStartTable = await msg.channel.send("Loading..");
      
       let binaryTable = new Discord.RichEmbed().setAuthor("Бинарный опцион")
       .setDescription(":bar_chart: Суть в том, что вы делаете ставку + (вверх), или - (вниз) на свою сумму. Если вы выигрываете - получаете х2, если проигрываете - теряете поставленную суму с баланса в банке.")
       .addField("!банк", "Проверка баланса", true)
       .addField("!бин [+/-] сумма", "Сделать ставку", true)
       .setThumbnail("http://binarnie-opciony.ru/wp-content/uploads/2017/01/binarnye-opciony.jpg")
       .setColor("#ffae00");
      
       binaryStartTable.edit(binaryTable);
      
        msg.reply("Играй на свой страх и риск, тут жоский рандом)");
       }

       // !бин +/- сумма

      if (sms.startsWith(`${prefix}бин`)) {

        binTxt = msg.content.replace("!бин", "");
        binTxt = binTxt.replace(/\s/g, " ");
        binTxt = binTxt.split(' ', 3);

        if(binTxt[1] != "-" && binTxt[1] != "+") return msg.reply(":name_badge: Ошибка. Пример ввода: !бин + 1");

        if(binTxt[2] == undefined || binTxt[2] == "") return msg.reply(":name_badge: Ошибка. Пример ввода: !бин - 2");

        if (isNaN(binTxt[2])) return msg.reply(":name_badge: Ты ввел не число!");
        
        try {

          bGauto();

          var jsonBalance = binaryGame[sender.id].balance;

          if (jsonBalance <= 0) {
            binaryGame[sender.id] = {
              balance: 3
            };

            return msg.reply("У тебя в банке было меньше 1го битка, и ты не мог играть.. По этому я дарю тебе 3 своих биткоина! :upside_down: Пробуй сыграть еще раз.");
          }

          var vBalance = parseInt(binTxt[2]);

          if (vBalance > jsonBalance) {
            return msg.reply("У тебя недостаточно денег на счету в банке :frowning:\n\n Проверка баланса: !банк");
          }

          var randNum = Math.round(Math.random() * (10 - 1) + 1);

          var procent = Math.round(Math.random() * (100 - 1) + 1);

          if (binTxt[1] == "-") {
            
            if (randNum <= 5) {
              var testNum = vBalance * 2;
              var testNum2 = jsonBalance + testNum;
              binaryGame[sender.id] = {
                balance: testNum2
              }

              msg.reply(`Поздравляем! :chart_with_downwards_trend: Курс акции упал на ${procent}%\n\nТы получаешь: ${testNum} биткоинов!`);
            } else {
              var testNum = jsonBalance - vBalance;
              binaryGame[sender.id] = {
                balance: testNum
              }

              msg.reply(` :chart_with_upwards_trend: Курс акции вырос на ${procent}%\n\nТы проиграл: ${vBalance} биткоинов.`);
            }

          } if (binTxt[1] == "+") {
            
            if (randNum <= 5) {
              var testNum = vBalance * 2;
              var testNum2 = jsonBalance + testNum;
              binaryGame[sender.id] = {
                balance: testNum2
              }

              msg.reply(`Поздравляем! :chart_with_upwards_trend: Курс акции вырос на ${procent}%\n\nТы получаешь: ${testNum} биткоинов!`);
            } else {
              var testNum = jsonBalance - vBalance;
              binaryGame[sender.id] = {
                balance: testNum
              }

              msg.reply(` :chart_with_downwards_trend: Курс акции упал на ${procent}%\n\nТы проиграл: ${vBalance} биткоинов.`);
            }

          }
        
          fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
            if (err) console.error(err);
          });

        } catch (error) {
          msg.reply(":name_badge: Ошибка. Пример ввода: !бин + 100");
        }

       }


      // !банк

if (sms == `${prefix}банк`) {

  bGauto();

  var bbalance = binaryGame[sender.id].balance;

  const m4 = await msg.channel.send("Loading..");

 let embed4 = new Discord.RichEmbed()
 .setDescription(":credit_card: Ваш баланс в банке:")
 .addField("Номер карты", msg.author.discriminator, true)
 .addField("Баланс", `${bbalance} биткоинов`, true)
 .setThumbnail(msg.author.avatarURL)
 .setColor("#ffae00");

  m4.edit(embed4);

  msg.reply("Вот такой у тебя баланс в банке :moneybag: ");
 }

  // !игры кнб

 if (sms == `${prefix}игры кнб`) {

  const knbHelpStartTable = await msg.channel.send("Loading..");

 let knbHelpTable = new Discord.RichEmbed().setAuthor("Камень, ножницы, бумага")
 .setDescription(":bar_chart: Все просто. Ну, объяснять думаю не нужно.")
 .addField("!камень", "Бросаете камень")
 .addField("!ножницы", "Бросаете ножницы")
 .addField("!бумага", "Бросаете бумагу")
 .setThumbnail("http://www.krasfun.ru/images/2014/12/13065_22533573_original.jpg")
 .setColor("#004d44");

 knbHelpStartTable.edit(knbHelpTable);

  msg.reply("Играй на свой страх и риск, тут жоский рандом)");
 }

  // !камень

  if (sms == `${prefix}камень`) {

    var randomKnb = Math.round(Math.random() * (4 - 1) + 1);

    switch(randomKnb) {
      case 1:
      case 2:
      msg.reply("Я тоже бросил камень :D\n\n Бросай дальше!");
      break;
      case 3:
      binaryGame[sender.id].balance = binaryGame[sender.id].balance + 10;
      msg.reply("Я кинул ножницы :(\n\nТы победил, и я дарю тебе в качестве приза 10 биткоинов.");
      break;
      case 4:
      msg.reply("Я кинул бумагу :)\n\nТы проиграл!");
      break;
    }
  
    fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
      if (err) console.error(err);
    });
   }

     // !ножницы

  if (sms == `${prefix}ножницы`) {

    var randomKnb = Math.round(Math.random() * (4 - 1) + 1);

    switch(randomKnb) {
      case 1:
      case 2:
      msg.reply("Я тоже бросил ножницы :D\n\n Бросай дальше!");
      break;
      case 3:
      binaryGame[sender.id].balance = binaryGame[sender.id].balance + 10;
      msg.reply("Блин, я кинул бумагу :(\n\nТы победил, и я дарю тебе в качестве приза 10 биткоинов.");
      break;
      case 4:
      msg.reply("Я кинул камень :)\n\nТы проиграл!");
      break;
    }
  
    fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
      if (err) console.error(err);
    });
   }

        // !бумага

  if (sms == `${prefix}бумага`) {

    var randomKnb = Math.round(Math.random() * (4 - 1) + 1);

    switch(randomKnb) {
      case 1:
      case 2:
      msg.reply("Я тоже бросил бумагу :D\n\n Бросай дальше!");
      break;
      case 3:
      binaryGame[sender.id].balance = binaryGame[sender.id].balance + 10;
      msg.reply("Блин, я кинул камень :(\n\nТы победил, и я дарю тебе в качестве приза 10 биткоинов.");
      break;
      case 4:
      msg.reply("Я кинул ножницы :)\n\nТы проиграл!");
      break;
    }
  
    fs.writeFile('jsons/binaryGame.json', JSON.stringify(binaryGame), (err) => {
      if (err) console.error(err);
    });
   }

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
.addField("!тест", "Проверка на активность")
.addField("!ава", "Скинет вашу аву")
.addField("!аноним айди сообщение", "Система отправки анонимных сообщений через Бота (Айди узнавать по ПКМ на пользователя => Копировать ID)")
.addField("!инфа", "Скинет инфу про ваш Дискордный Аккаунт")
.addField("!сколько text", "По считает кол-во символов в вашем тексте [БЕЗ ПРОБЕЛОВ]")
.addField("!рандом число1 число2", "Сгенирирует рандомное число в вашем диапазоне")
.addField("!скажи text", "Повторит за вами текст")
.addField("!сервер", "Покажет информацию о данном сервере")
//.addField("!музыка", "Все команды для воспроизведения музыки")
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

        msg.reply("Тебе короч выпало вот такое число: " + Math.round(num));
      }
  
// !сервер

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
     .addField("Роль по умолчанию: ", msg.guild.defaultRole)
     .addField("Тег Бота: ", msg.guild.me)
     .addField("Когда бот присоединился: ", msg.guild.joinedAt)
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

  msg.channel.send(msg.guild.systemChannelID);
}


/////////////////////////////////////////////////////////////////
//                                                             //
//                                                             //
//                     MUSIC   COMMANDS                        //
//                                                             //
//                                                             //
/////////////////////////////////////////////////////////////////

// // !музыка

// if (sms.startsWith(`${prefix}музыка`)) {

//   const m4 = await msg.channel.send("Погодь..");

//  let embed4 = new Discord.RichEmbed().setAuthor("Ответец")
//  .setDescription(":musical_score: Все музыкальные команды туть: ")
//  .addField("!плей [ссылка]", "Запуск денсинга")
//  .addField("!пауза", "Ну как бе и так ясно шо эт пауза")
//  .addField("!дальше", "Продолжение музяки если вы взяли паузу")
//  .addField("!пропуск", "Пропуск текущей композиции")
//  .addField("!стоп", "Моя остановочка")
//  //.addField("!минфа", "Информация о текущей музыке [НЕ РОБИТ]")
//  .setThumbnail("http://www.vborskom.ru/razdel/music.jpg")
//  .setColor("#009fff");

//   m4.edit(embed4);

//   msg.reply("Вот тебе список команд по музяке :headphones: ");
//  }

//  // !плей / музыка

//  var musicOnline = 0;
//  var pauseBool = 0;

//  if (sms.startsWith(`${prefix}плей`)) {

//  var musicTxt = msg.content.replace("!плей", "");
//      musicTxt = musicTxt.replace(/\s/g, "");

//     if (musicTxt == "" || musicTxt == undefined || musicTxt == null) {  return msg.reply(":name_badge: Ты ввел не правильную ссыль! А ну перепроверь."); }
 
//     if (!msg.member.voiceChannel) { return msg.reply(":name_badge: Зайди сначала в канал :/ Как ты меня услышишь!"); } 

//     if (!servers[msg.guild.id]) { servers[msg.guild.id] = { queue:[] }; } 

//   var server = servers[msg.guild.id];

//   server.queue.push(musicTxt);

//   if (!msg.guild.voiceConnection) { 

//   msg.member.voiceChannel.join().then(function(connection) {

//    play(connection, msg);

//    musicOnline = 1;

//    msg.reply("Музыку в студию! - кричал народ, а им в ответ слышалось \''Да ладно!\''");

//   });

//    } 

//   msg.reply("Приятного прослушивания музяки :sunglasses: ");

//  }

//  // !пауза / музыка

//  if (sms.startsWith(`${prefix}пауза`)) {

//   try {

//   var server = servers[msg.guild.id];

//   if (server.dispatcher) server.dispatcher.pause();

//   msg.reply("Музыка на паузе, есть время сгонять на кухню за бутербродом :point_up: ");

//   } catch (error) {
//     msg.reply(":name_badge: Шо та пошло не так. Наверное у тебя музыка не запущена :/");
//   }
 
//   }

//    // !дальше / музыка

//  if (sms.startsWith(`${prefix}дальше`)) {

//   try {

//   var server = servers[msg.guild.id];

//   if (server.dispatcher) server.dispatcher.resume();

//   msg.reply("Пора продолжить прослушивание музыки! Поехали!");
 
// } catch (error) {
//   msg.reply(":name_badge: Шо та пошло не так. Наверное у тебя музыка не запущена :/");
// }

//   }

// // !пропуск / музыка

//   if (sms.startsWith(`${prefix}пропуск`)) {

//     try {

//     var server = servers[msg.guild.id];

//     if (server.dispatcher) server.dispatcher.end();

//     msg.reply("Согласен, песня была хреновая, едем дальше! :arrow_right: ");
   
//   } catch (error) {
//     msg.reply(":name_badge: Шо та пошло не так. Наверное у тебя музыка не запущена :/");
//   }

//     }

// // !стоп / музыка

//   if (sms.startsWith(`${prefix}стоп`)) {

//     try {
//     var server = servers[msg.guild.id];

//     if (msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();

//     msg.channel.send("Ну все! Кина не будет( Электричество выключили :frowning: \n\n Надеюсь приятно провели время :stuck_out_tongue: "); }
     
//     catch (error) {
//       msg.reply(":name_badge: Шо та пошло не так. Наверное у тебя музыка не запущена :/");
//     }

//     }
  });

//.addField(".readyAt", msg.client.readyAt) .addField(".browser", msg.client.browser)
//embed "[add link btn] (youtube.com)"
