const fs = require('fs')
const talkedRecently = new Set();
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('Starame is ready!')
    client.user.setActivity('people who run s)help', { type: 'WATCHING'})
})

client.on('message', message => {
  if(message.author.bot) return;
  let cmd = message.content.toLowerCase();

//  if (cmd.startsWith('s)ping') || cmd.startsWith('s)help') || cmd.startsWith('s)start') || cmd.startsWith('s)leave') || cmd.startsWith('s)use') || cmd.startsWith('s)info') || cmd.startsWith('s)moveinfo') || cmd.startsWith('s)buymove') || cmd.startsWith('s)buyhp') || cmd.startsWith('s)pay') || cmd.startsWith('s)leave')) {
//    message.channel.send('Starame is in maintain!')
//    return
//  }
  try {

  if (cmd.startsWith('s)ping') || cmd.startsWith('s)help') || cmd.startsWith('s)start') || cmd.startsWith('s)leave') || cmd.startsWith('s)use') || cmd.startsWith('s)info') || cmd.startsWith('s)moveinfo') || cmd.startsWith('s)buymove') || cmd.startsWith('s)buyhp') || cmd.startsWith('s)pay') || cmd.startsWith('s)leave')) {
    if (talkedRecently.has('u-' + message.author.id)) {
      message.channel.send("You are in a 3 second cooldown.");
      return
    } else {
      talkedRecently.add('u-' + message.author.id);
      setTimeout(() => {
        talkedRecently.delete('u-' + message.author.id);
      }, 3000);
    }
  }

  if (cmd.startsWith('s)ping') || cmd.startsWith('s)help') || cmd.startsWith('s)start') || cmd.startsWith('s)leave') || cmd.startsWith('s)use') || cmd.startsWith('s)info') || cmd.startsWith('s)moveinfo') || cmd.startsWith('s)buymove') || cmd.startsWith('s)buyhp') || cmd.startsWith('s)pay') || cmd.startsWith('s)leave')) {
    if (talkedRecently.has('global')) {
      console.log('"' + message.author.id + ' has tried to run a command during cooldown.')
      message.channel.send("This bot is in a global cooldown of 1 second.");
      return
    } else {
      console.log('"' + message.author.id + ' has activated cooldown.')
      talkedRecently.add('global');
      setTimeout(() => {
        talkedRecently.delete('global');
        console.log('The cooldown "' + message.author.id + '" enabled has been deactivated.')
      }, 1000);
    }
  }

  if (cmd.startsWith('s)ping')) {
    message.channel.send('My websocket ping is ' + client.ping + 'ms.')
    return
  }

  if (cmd.startsWith('s)help')) {
    if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
      const embed = new Discord.RichEmbed()
        .setAuthor('Help')
        .setColor(0xffff00)
        .setDescription('`s)help` **-** This is the help command.\n`s)ping` **-** Ping the bot!\n`s)info` **-** See your info.\n`s)pay <mention user> <amount>` **-** Pay someone gold.\n`s)moveinfo <move id>` **-** See information of a move.\n`s)buymove <moveid> <moveslot>` **-** Buy a move.\n`s)buyhp`**-** Buy a single HP for 10 coins.\n`s)fight` **-** Fight someone.\n`s)leave` **-** Exit a fight.\n`s)use[no]` **-** Use a move. [no] can be 1-4 (move number). It is used in a battle.')
        .addField('Move List', 'You can see the whole move list here: https://pastebin.com/raw/JEvufnyG', false)
        .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
        message.channel.send({embed});
    } else {
      const embed = new Discord.RichEmbed()
        .setAuthor('Help')
        .setColor(0xffff00)
        .setDescription('`s)help` **-** This is the help command.\n`s)ping` **-** Ping the bot!\n`s)start` **-** Start your adventure.')
        .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
        message.channel.send({embed});
    }
    return
  }

  if (cmd.startsWith('s)start')) {
    if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send('You have already started the game!')
    } else {
        fs.writeFile('data//coins//' + message.author.id + '.txt', '5', function(err) {
        if (err) throw err;
        });
        fs.writeFile('data//moves//' + message.author.id + '-1.txt', '1', function(err) {
        if (err) throw err;
        });
        fs.writeFile('data//moves//' + message.author.id + '-2.txt', '0', function(err) {
        if (err) throw err;
        });
        fs.writeFile('data//moves//' + message.author.id + '-3.txt', '0', function(err) {
        if (err) throw err;
        });
        fs.writeFile('data//moves//' + message.author.id + '-4.txt', '0', function(err) {
        if (err) throw err;
        });
        fs.writeFile('data//maxhealth//' + message.author.id + '.txt', '20', function(err) {
        if (err) throw err;
        });
        const embed = new Discord.RichEmbed()
          .setAuthor('Start')
          .setColor(0xffff00)
          .setDescription('You have started the game!')
          .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
        message.channel.send({embed});
    }
    return
  }

  if (cmd.startsWith('s)pay')) {
    prefix = "s)pay"
    arg = message.content.slice(prefix.length).split(' ');
    if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
      if (!message.mentions.users.size) {
        message.channel.send('Incorrect Arguments | `s)pay <mention user> <gold>`');
        return
      } else {
        if (!arg[2]) {
          message.channel.send("Incorrect Arguments | `s)pay <mention user> <gold>`")
          return
        }
        var opponent = message.mentions.users.first();
        if (opponent == message.author) {
          message.channel.send("You can't pay yourself.")
          return
        } if(opponent.bot) {
          message.channel.send("You can't pay bots.")
          return
        } if (!fs.existsSync('data//coins//' + opponent.id + '.txt')) {
          message.channel.send("Sorry, but the mentioned user hasn't started the game yet.")
          return
        } else {
          amount = parseFloat(arg[2], 10)
          if (amount < 1) {
            message.channel.send("You can't pay someone less than 1 gold.")
            return
          }
          usergoldstring = fs.readFileSync('data//coins//' + message.author.id + '.txt').toString().split('\n');
          usergold = parseFloat(usergoldstring, 10)
          if (amount <= usergold) {
            usergold = usergold - amount
            fs.writeFile('data//coins//' + message.author.id + '.txt', usergold, function(err) {
            if (err) throw err;
            });
            opponentgoldstring = fs.readFileSync('data//coins//' + opponent.id + '.txt').toString().split('\n');
            opponentgold = parseFloat(opponentgoldstring, 10)
            opponentgold = opponentgold + amount
            fs.writeFile('data//coins//' + opponent.id + '.txt', opponentgold, function(err) {
            if (err) throw err;
            });
            message.channel.send(opponent + " has been paid " + amount + " gold.")
            return
          } else {
            message.channel.send("You don't have enough gold to pay that much gold!")
            return
          }
        }
      }
    } else {
      message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
      return
    }
    return
  }

  if (cmd.startsWith('s)leave')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      var opponentid = fs.readFileSync('data//battles//' + message.author.id + '-opponent.txt').toString().split('\n');
      userhp = fs.readFileSync('data//battles//' + message.author.id + '-hp.txt').toString().split('\n');
      enemyhp = fs.readFileSync('data//battles//' + opponentid + '-hp.txt').toString().split('\n');
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        fs.unlink('data//battles//' + message.author.id + '-going.txt', function (err) {
        if (err) throw err;
        });
      } else {
        fs.unlink('data//battles//' + opponentid + '-going.txt', function (err) {
        if (err) throw err;
        });
      }
      fs.unlink('data//battles//' + message.author.id + '-opponent.txt', function (err) {
      if (err) throw err;
      });
      fs.unlink('data//battles//' + opponentid + '-opponent.txt', function (err) {
      if (err) throw err;
      });
      fs.unlink('data//battles//' + message.author.id + '-hp.txt', function (err) {
      if (err) throw err;
      });
      fs.unlink('data//battles//' + opponentid + '-hp.txt', function (err) {
      if (err) throw err;
      });
      if (fs.existsSync('data//battles//' + message.author.id + '-poison.txt')) {
        fs.unlink('data//battles//' + message.author.id + '-poison.txt', function (err) {
        if (err) throw err;
        });
        fs.unlink('data//battles//' + message.author.id + '-poisonperson.txt', function (err) {
        if (err) throw err;
        });
      }
      if (fs.existsSync('data//battles//' + opponentid + '-poison.txt')) {
        fs.unlink('data//battles//' + opponentid + '-poison.txt', function (err) {
        if (err) throw err;
        });
        fs.unlink('data//battles//' + opponentid + '-poisonperson.txt', function (err) {
        if (err) throw err;
        });
      }
      const embed = new Discord.RichEmbed()
        .setAuthor('Battle')
        .setColor(0xFF0000)
        .setDescription(message.author + ' **VS** ' + '<@' + opponentid + '>')
        .addField(message.author.username + ' has exit the fight.', 'It was successful.', false)
        .addField('Status', "**" + message.author + "'s HP**: " + userhp + "\n**<@" + opponentid + ">'s HP**: " + enemyhp, false)
        .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
      message.channel.send({embed});
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
      }
    }
    return
  }



  if (cmd.startsWith('s)use1')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-1.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)use2')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-2.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)use3')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-3.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)use4')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-4.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)use 1')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-1.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)use 2')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-2.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)use 3')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-3.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)use 4')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        var move = fs.readFileSync('data//moves//' + message.author.id + '-4.txt').toString().split('\n');
        if (fs.existsSync('data//moveid//' + move + '-name.txt')) {
          useMove(message, move)
        } else {
          message.channel.send('That is not a valid move.')
          return
        }
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)info')) {
    if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
      if (!message.mentions.users.size) {
        user = message.author
        userid = message.author.id
      } else {
        opponent = message.mentions.users.first();
        if (!fs.existsSync('data//coins//' + opponent.id + '.txt')) {
          message.channel.send("Sorry, but the mentioned user hasn't started the game yet.")
          return
        }
        userid = opponent.id
        user = opponent
      }
      var varpoints = fs.readFileSync('data//coins//' + userid + '.txt').toString().split('\n');
      var move1 = fs.readFileSync('data//moves//' + userid + '-1.txt').toString().split('\n');
      if (fs.existsSync('data//moveid//' + move1 + '-name.txt')) {
        var move1name = fs.readFileSync('data//moveid//' + move1 + '-name.txt').toString().split('\n');
        var move1description = fs.readFileSync('data//moveid//' + move1 + '-description.txt').toString().split('\n');
      } else {
        move1 = 0
        var move1name = "None"
        var move1description = "This is not a valid move."
      }
      var move2 = fs.readFileSync('data//moves//' + userid + '-2.txt').toString().split('\n');
      if (fs.existsSync('data//moveid//' + move2 + '-name.txt')) {
        var move2name = fs.readFileSync('data//moveid//' + move2 + '-name.txt').toString().split('\n');
        var move2description = fs.readFileSync('data//moveid//' + move2 + '-description.txt').toString().split('\n');
      } else {
        move2 = 0
        var move2name = "None"
        var move2description = "This is not a valid move."
      }
      var move3 = fs.readFileSync('data//moves//' + userid + '-3.txt').toString().split('\n');
      if (fs.existsSync('data//moveid//' + move3 + '-name.txt')) {
        var move3name = fs.readFileSync('data//moveid//' + move3 + '-name.txt').toString().split('\n');
        var move3description = fs.readFileSync('data//moveid//' + move3 + '-description.txt').toString().split('\n');
      } else {
        move3 = 0
        var move3name = "None"
        var move3description = "This is not a valid move."
      }
      var move4 = fs.readFileSync('data//moves//' + userid + '-4.txt').toString().split('\n');
      if (fs.existsSync('data//moveid//' + move4 + '-name.txt')) {
        var move4name = fs.readFileSync('data//moveid//' + move4 + '-name.txt').toString().split('\n');
        var move4description = fs.readFileSync('data//moveid//' + move4 + '-description.txt').toString().split('\n');
      } else {
        move4 = 0
        var move4name = "None"
        var move4description = "This is not a valid move."
      }
      var health = fs.readFileSync('data//maxhealth//' + userid + '.txt').toString().split('\n');
      const embed = new Discord.RichEmbed()
        .setAuthor('Main Info')
        .setColor(0xffff00)
        .setDescription('**Name:** ' + user + '\n**Max Health:** ' + health + '\n**Coins:** ' + varpoints)
        .addField('Move 1: ' + move1name, move1description + '\n`[Move ID: ' + move1 + ']`', false)
        .addField('Move 2: ' + move2name, move2description + '\n`[Move ID: ' + move2 + ']`', false)
        .addField('Move 3: ' + move3name, move3description + '\n`[Move ID: ' + move3 + ']`', false)
        .addField('Move 4: ' + move4name, move4description + '\n`[Move ID: ' + move4 + ']`', false)
        .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
      message.channel.send({embed});
    } else {
      message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
    }
    return
  }

  if (cmd.startsWith('s)moveinfo')) {
    if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
      prefix = "s)moveinfo"
      move = message.content.slice(prefix.length).split(' ');
      if (move[1]) {
        if (move[2]) {
          message.channel.send("Please enter a valid move id.")
          return
        } else {
          if (fs.existsSync('data//moveid//' + move[1] + '-name.txt')) {
            var movename = fs.readFileSync('data//moveid//' + move[1] + '-name.txt').toString().split('\n');
            var movedescription = fs.readFileSync('data//moveid//' + move[1] + '-description.txt').toString().split('\n');
            if (fs.existsSync('data//moveid//' + move[1] + '-cost.txt')) {
              cost = fs.readFileSync('data//moveid//' + move[1] + '-cost.txt').toString().split('\n');
              if (cost == 1) {
                cost = cost + " Coin"
              } else {
                if (cost == 0) {
                  cost = "Free"
                } else {
                  cost = cost + " Coins"
                }
              }
            } else {
              cost = 'Not for sale!'
            }
            hitchance = fs.readFileSync('data//moveid//' + move[1] + '-chance.txt').toString().split('\n');
            if (fs.existsSync('data//moveid//' + move[1] + '-enemydamagechance.txt')) {
              enemydamagehitchance = fs.readFileSync('data//moveid//' + move[1] + '-enemydamagechance.txt').toString().split('\n');
              var enemydamageminstring = fs.readFileSync('data//moveid//' + move[1] + '-enemydamagemin.txt').toString().split('\n');
              var enemydamagemaxstring = fs.readFileSync('data//moveid//' + move[1] + '-enemydamagemax.txt').toString().split('\n');
              enemydamagemin = parseFloat(enemydamageminstring, 10)
              enemydamagemax = parseFloat(enemydamagemaxstring, 10)
              enemydamageaverage = (enemydamagemax + enemydamagemin)/2
            } else {
              enemydamagehitchance = 0
              enemydamagemin = 0
              enemydamagemax = 0
              enemydamageaverage = 0
            }
            if (fs.existsSync('data//moveid//' + move[1] + '-enemyhealchance.txt')) {
              enemyhealhitchance = fs.readFileSync('data//moveid//' + move[1] + '-enemyhealchance.txt').toString().split('\n');
              var enemyhealminstring = fs.readFileSync('data//moveid//' + move[1] + '-enemyhealmin.txt').toString().split('\n');
              var enemyhealmaxstring = fs.readFileSync('data//moveid//' + move[1] + '-enemyhealmax.txt').toString().split('\n');
              enemyhealmin = parseFloat(enemyhealminstring, 10)
              enemyhealmax = parseFloat(enemyhealmaxstring, 10)
              enemyhealaverage = (enemyhealmax + enemyhealmin)/2
            } else {
              enemyhealhitchance = 0
              enemyhealmin = 0
              enemyhealmax = 0
              enemyhealaverage = 0
            }
            if (fs.existsSync('data//moveid//' + move[1] + '-enemypoisonchance.txt')) {
              enemypoisonhitchance = fs.readFileSync('data//moveid//' + move[1] + '-enemypoisonchance.txt').toString().split('\n');
              var enemypoisonminstring = fs.readFileSync('data//moveid//' + move[1] + '-enemypoisonmin.txt').toString().split('\n');
              var enemypoisonmaxstring = fs.readFileSync('data//moveid//' + move[1] + '-enemypoisonmax.txt').toString().split('\n');
              enemypoisonmin = parseFloat(enemypoisonminstring, 10)
              enemypoisonmax = parseFloat(enemypoisonmaxstring, 10)
              enemypoisonaverage = (enemypoisonmax + enemypoisonmin)/2
            } else {
              enemypoisonhitchance = 0
              enemypoisonmin = 0
              enemypoisonmax = 0
              enemypoisonaverage = 0
            }
            if (fs.existsSync('data//moveid//' + move[1] + '-userdamagechance.txt')) {
              userdamagehitchance = fs.readFileSync('data//moveid//' + move[1] + '-userdamagechance.txt').toString().split('\n');
              var userdamageminstring = fs.readFileSync('data//moveid//' + move[1] + '-userdamagemin.txt').toString().split('\n');
              var userdamagemaxstring = fs.readFileSync('data//moveid//' + move[1] + '-userdamagemax.txt').toString().split('\n');
              userdamagemin = parseFloat(userdamageminstring, 10)
              userdamagemax = parseFloat(userdamagemaxstring, 10)
              userdamageaverage = (userdamagemax + enemydamagemin)/2
            } else {
              userdamagehitchance = 0
              userdamagemin = 0
              userdamagemax = 0
              userdamageaverage = 0
            }
            if (fs.existsSync('data//moveid//' + move[1] + '-userhealchance.txt')) {
              userhealhitchance = fs.readFileSync('data//moveid//' + move[1] + '-userhealchance.txt').toString().split('\n');
              var userhealminstring = fs.readFileSync('data//moveid//' + move[1] + '-userhealmin.txt').toString().split('\n');
              var userhealmaxstring = fs.readFileSync('data//moveid//' + move[1] + '-userhealmax.txt').toString().split('\n');
              userhealmin = parseFloat(userhealminstring, 10)
              userhealmax = parseFloat(userhealmaxstring, 10)
              userhealaverage = (userhealmax + userhealmin)/2
            } else {
              userhealhitchance = 0
              userhealmin = 0
              userhealmax = 0
              userhealaverage = 0
            }
            if (fs.existsSync('data//moveid//' + move[1] + '-userpoisonchance.txt')) {
              userpoisonhitchance = fs.readFileSync('data//moveid//' + move[1] + '-userpoisonchance.txt').toString().split('\n');
              var userpoisonminstring = fs.readFileSync('data//moveid//' + move[1] + '-userpoisonmin.txt').toString().split('\n');
              var userpoisonmaxstring = fs.readFileSync('data//moveid//' + move[1] + '-userpoisonmax.txt').toString().split('\n');
              userpoisonmin = parseFloat(userpoisonminstring, 10)
              userpoisonmax = parseFloat(userpoisonmaxstring, 10)
              userpoisonaverage = (userpoisonmax + userpoisonmin)/2
            } else {
              userpoisonhitchance = 0
              userpoisonmin = 0
              userpoisonmax = 0
              userpoisonaverage = 0
            }
            const embed = new Discord.RichEmbed()
              .setAuthor('Move ID: ' + move[1])
              .setColor(0xffff00)
              .setDescription('Below shows the information for of the move id you picked.')
              .addField('Main Information', '**Name**: ' + movename + '\n**Description**: ' + movedescription + '\n**Chance**: ' + hitchance + '%\n**Cost**: ' + cost, true)
              .addField('User Damage Information', '**Damage Chance**: ' + userdamagehitchance + '%\n**Minimum Damage**: ' + userdamagemin + '\n**Maximum Damage**: ' + userdamagemax + '\n**Average Damage**: ' + userdamageaverage, true)
              .addField('User Poison Information', '**Poison Chance**: ' + userpoisonhitchance + '%\n**Minimum Poison Damage**: ' + userpoisonmin + '\n**Maximum Poison Damage**: ' + userpoisonmax + '\n**Average Poison Damage**: ' + userpoisonaverage, true)
              .addField('User Heal Information', '**Heal Chance**: ' + userhealhitchance + '%\n**Minimum Heal**: ' + userhealmin + '\n**Maximum Heal**: ' + userhealmax + '\n**Average Heal**: ' + userhealaverage, true)
              .addField('Enemy Damage Information', '**Damage Chance**: ' + enemydamagehitchance + '%\n**Minimum Damage**: ' + enemydamagemin + '\n**Maximum Damage**: ' + enemydamagemax + '\n**Average Damage**: ' + enemydamageaverage, true)
              .addField('Enemy Poison Information', '**Poison Chance**: ' + enemypoisonhitchance + '%\n**Minimum Poison Damage**: ' + enemypoisonmin + '\n**Maximum Poison Damage**: ' + enemypoisonmax + '\n**Average Poison Damage**: ' + enemypoisonaverage, true)
              .addField('Enemy Heal Information', '**Heal Chance**: ' + enemyhealhitchance + '%\n**Minimum Heal**: ' + enemyhealmin + '\n**Maximum Heal**: ' + enemyhealmax + '\n**Average Heal**: ' + enemyhealaverage, true)
              .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
            message.channel.send({embed});
            return
          } else {
            const embed = new Discord.RichEmbed()
              .setAuthor('Move ID: ' + move[1])
              .setColor(0xffff00)
              .setDescription('This move does not exist.')
              .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
            message.channel.send({embed});
            return
          }
        }
      } else {
        message.channel.send("Please enter a valid move id.")
        return
      }
    } else {
      message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
    }
    return
  }



  if (cmd.startsWith('s)use')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      if (fs.existsSync('data//battles//' + message.author.id + '-going.txt')) {
        message.channel.send('Use `s)info` to see your moves. Use `s)use1`, `s)use2`, `s)use3` or `s)use4` to use a move.')
        return
      } else {
        message.channel.send("It isn't your turn.")
        return
      }
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        message.channel.send("You are not fighting anyone right now.")
        return
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }

  if (cmd.startsWith('s)buymove')) {
    if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
      prefix = "s)buy"
      move = message.content.slice(prefix.length).split(' ');
      if (move[1]) {
        if (move[2]) {
          if (fs.existsSync('data//moveid//' + move[1] + '-name.txt')) {
            if (fs.existsSync('data//moveid//' + move[1] + '-cost.txt')) {
              cost = fs.readFileSync('data//moveid//' + move[1] + '-cost.txt').toString().split('\n');
            } else {
              message.channel.send('This move is not for sale.')
              return
            }
            moveslot = parseFloat(move[2], 10)
            if (moveslot > 0) {
              if (moveslot < 5) {
              } else {
                message.channel.send('This is not a valid move slot.')
                return
              }
            } else {
              message.channel.send('This is not a valid move slot.')
              return
            }
            cost = parseFloat(cost, 10)
            var varpoints = fs.readFileSync('data//coins//' + message.author.id + '.txt').toString().split('\n');
            points = parseFloat(varpoints, 10)
            if (points < cost) {
              message.channel.send('Sorry, but you do not have enough coins to buy this move.')
              return
            }
            points = points - cost
            fs.writeFile('data//coins//' + message.author.id + '.txt', points, function(err) {
            if (err) throw err;
            });
            fs.writeFile('data//moves//' + message.author.id + '-' + move[2] + '.txt', move[1], function(err) {
            if (err) throw err;
            });
            const embed = new Discord.RichEmbed()
              .setAuthor('Item Bought!')
              .setColor(0xffff00)
              .setDescription('You have successfully bought this move!')
              .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
            message.channel.send({embed});
            return
          } else {
            const embed = new Discord.RichEmbed()
              .setAuthor('Invalid Move ID')
              .setColor(0xffff00)
              .setDescription('This move does not exist.')
              .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
            message.channel.send({embed});
            return
          }
        } else {
          message.channel.send("Incorrect Arguments | `s)buymove <moveid> <moveslot>`")
          return
        }
      } else {
        message.channel.send("Incorrect Arguments | `s)buymove <moveid> <moveslot>`")
        return
      }
    } else {
      message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
    }
    return
  }

  if (cmd.startsWith('s)buyhp')) {
    if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
      cost = 10
      cost = parseFloat(cost, 10)
      var varpoints = fs.readFileSync('data//coins//' + message.author.id + '.txt').toString().split('\n');
      points = parseFloat(varpoints, 10)
      var varhp = fs.readFileSync('data//maxhealth//' + message.author.id + '.txt').toString().split('\n');
      hp = parseFloat(varhp, 10)
      if (hp == 999) {
        message.channel.send('Sorry, but you have the maximum amount of HP.')
        return
      }
      if (points < cost) {
        message.channel.send('Sorry, but you do not have enough coins to buy this move.')
        return
      }
      hp = hp + 1
      points = points - cost
      fs.writeFile('data//coins//' + message.author.id + '.txt', points, function(err) {
      if (err) throw err;
      });
      fs.writeFile('data//maxhealth//' + message.author.id + '.txt', hp, function(err) {
      if (err) throw err;
      });
      const embed = new Discord.RichEmbed()
       .setAuthor('HP bought!')
       .setColor(0xffff00)
       .setDescription('You have successfully bought 1 HP!')
       .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
      message.channel.send({embed});
      return
    } else {
      message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
    }
    return
  }

  if (cmd.startsWith('s)fight')) {
    if (fs.existsSync('data//battles//' + message.author.id + '-opponent.txt')) {
      message.channel.send("You are already battling someone.")
      return
    } else {
      if (fs.existsSync('data//coins//' + message.author.id + '.txt')) {
        if (!message.mentions.users.size) {
          message.channel.send('You have to mention **only** 1 member to fight them! (first mention only)');
          return
        } else {
          var opponent = message.mentions.users.first();
          if (opponent == message.author) {
            message.channel.send("You can't fight yourself.")
            return
          } if (fs.existsSync('data//battles//' + opponent.id + '-opponent.txt', opponent.id)) {
            message.channel.send("The mentioned user is already fighting someone.")
            return
          } if(opponent.bot) {
            message.channel.send("You can't fight bots.")
            return
          } else {
            if (fs.existsSync('data//coins//' + opponent.id + '.txt')) {
              var userhealth = fs.readFileSync('data//maxhealth//' + message.author.id + '.txt').toString().split('\n');
              var enemyhealth = fs.readFileSync('data//maxhealth//' + opponent.id + '.txt').toString().split('\n');
              if (opponent.id == '579317044915208202') {
                random = 2
              } else {
                random = Math.floor(Math.random() * 2) + 1;
              }
              fs.writeFile('data//battles//' + message.author.id + '-opponent.txt', opponent.id, function(err) {
              if (err) throw err;
              });
              fs.writeFile('data//battles//' + opponent.id + '-opponent.txt', message.author.id, function(err) {
              if (err) throw err;
              });
              fs.writeFile('data//battles//' + message.author.id + '-hp.txt', userhealth, function(err) {
              if (err) throw err;
              });
              fs.writeFile('data//battles//' + opponent.id + '-hp.txt', enemyhealth, function(err) {
              if (err) throw err;
              });
              if (random == 1) {
                fs.writeFile('data//battles//' + message.author.id + '-going.txt', "1", function(err) {
                if (err) throw err;
                });
                const embed = new Discord.RichEmbed()
                  .setAuthor('Battle')
                  .setColor(0xFF0000)
                  .setDescription(message.author + ' **VS** ' + opponent)
                  .addField('Who Goes First', message.author, false)
                  .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
                message.channel.send({embed});
                return
              } else {
                fs.writeFile('data//battles//' + opponent.id + '-going.txt', "1", function(err) {
                if (err) throw err;
                });
                const embed = new Discord.RichEmbed()
                  .setAuthor('Battle')
                  .setColor(0xFF0000)
                  .setDescription(message.author + ' **VS** ' + opponent)
                  .addField('Who Goes First', opponent, false)
                  .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
                message.channel.send({embed});
              }
            } else {
              message.channel.send("Sorry, but the mentioned user hasn't started the game yet.")
              return
            }
          }
        }
      } else {
        message.channel.send("Sorry, but you haven't started the game yet. Use the command `s)start` to start the game!")
        return
      }
    }
    return
  }
  
  } catch(err) {
    console.log(err);
  }
});

function useMove(message, move) {
  try {

  notes = ""
  delete notes
  fs.unlink('data//battles//' + message.author.id + '-going.txt', function (err) {
  if (err) throw err;
  });
  var opponentid = fs.readFileSync('data//battles//' + message.author.id + '-opponent.txt').toString().split('\n');
  var movename = fs.readFileSync('data//moveid//' + move + '-name.txt').toString().split('\n');
  userhpstring = fs.readFileSync('data//battles//' + message.author.id + '-hp.txt').toString().split('\n');
  userhp = parseFloat(userhpstring, 10)
  enemyhpstring = fs.readFileSync('data//battles//' + opponentid + '-hp.txt').toString().split('\n');
  enemyhp = parseFloat(enemyhpstring, 10)
  if (fs.existsSync('data//battles//' + opponentid + '-poison.txt')) {
    poisonchance = Math.floor(Math.random() * 5) + 1;
    if (poisonchance == 1) {
      fs.unlink('data//battles//' + opponentid + '-poison.txt', function (err) {
      if (err) throw err;
      });
      fs.unlink('data//battles//' + opponentid + '-poisonperson.txt', function (err) {
      if (err) throw err;
      });
      if (typeof notes === 'undefined') {
        notes = "<@" + opponentid + "> lost their poison!"
      } else {
        notes = notes + "\n<@" + opponentid + "> lost their poison!"
      }
    } else {
      poisonperson = fs.readFileSync('data//battles//' + opponentid + '-poisonperson.txt').toString().split('\n');
      var poisonmove = fs.readFileSync('data//battles//' + opponentid + '-poison.txt').toString().split('\n');
      var poisondamagemaxstring = fs.readFileSync('data//moveid//' + poisonmove + '-' + poisonperson + 'poisonmax.txt').toString().split('\n');
      poisondamagemax = parseFloat(poisondamagemaxstring, 10)
      if (poisondamagemax !== 0) {
        var poisondamageminstring = fs.readFileSync('data//moveid//' + poisonmove + '-' + poisonperson + 'poisonmin.txt').toString().split('\n');
        poisondamagemin = parseFloat(poisondamageminstring, 10)
        movepoisonrandom = Math.floor(Math.random() * (poisondamagemax - poisondamagemin)) + poisondamagemin;
        if (movepoisonrandom < enemyhp) {
          enemyhp = enemyhp - movepoison
        } else {
          movepoison = enemyhp - 1
          enemyhp = 1
          if (typeof notes === 'undefined') {
            notes = '**[ALERT]** Poison damage will not occur if the player has 1HP left.'
          } else {
            notes = notes + '\n**[ALERT]** Poison damage will not occur if the player has 1HP left.'
          }
        }
        if (typeof notes === 'undefined') {
          notes = 'The poison damaged <@' + opponentid + '> by ' + movepoison + ' damage.'
        } else {
          notes = notes + '\nThe poison damaged <@' + opponentid + '> by ' + movepoison + ' damage.'
        }
      }
    }
  }
  if (fs.existsSync('data//battles//' + message.author.id + '-poison.txt')) {
    poisonchance = Math.floor(Math.random() * 5) + 1;
    if (poisonchance == 1) {
      fs.unlink('data//battles//' + message.author.id + '-poison.txt', function (err) {
      if (err) throw err;
      });
      fs.unlink('data//battles//' + message.author.id + '-poisonperson.txt', function (err) {
      if (err) throw err;
      });
      if (typeof notes === 'undefined') {
        notes = "<@" + message.author.id + "> lost their poison!"
      } else {
        notes = notes + "\n<@" + message.author + "> lost their poison!"
      }
    } else {
      poisonperson = fs.readFileSync('data//battles//' + message.author.id + '-poisonperson.txt').toString().split('\n');
      var poisonmove = fs.readFileSync('data//battles//' + message.author.id + '-poison.txt').toString().split('\n');
      var poisondamagemaxstring = fs.readFileSync('data//moveid//' + poisonmove + '-' + poisonperson + 'poisonmax.txt').toString().split('\n');
      poisondamagemax = parseFloat(poisondamagemaxstring, 10)
      if (poisondamagemax !== 0) {
        var poisondamageminstring = fs.readFileSync('data//moveid//' + poisonmove + '-' + poisonperson + 'poisonmin.txt').toString().split('\n');
        poisondamagemin = parseFloat(poisondamageminstring, 10)
        movepoisonrandom = Math.floor(Math.random() * (poisondamagemax - poisondamagemin)) + poisondamagemin;
        if (movepoisonrandom < userhp) {
          userhp = userhp - movepoison
        } else {
          movepoison = userhp - 1
          userhp = 1
          if (typeof notes === 'undefined') {
            notes = '**[ALERT]** Poison damage will not occur if the player has 1HP left.'
          } else {
            notes = notes + '\n**[ALERT]** Poison damage will not occur if the player has 1HP left.'
          }
        }
        if (typeof notes === 'undefined') {
          notes = 'The poison damaged ' + message.author + ' by ' + movepoison + ' damage.'
        } else {
          notes = notes + '\nThe poison damaged ' + message.author + ' by ' + movepoison + ' damage.'
        }
      }
    }
  }
  hitchancestring = fs.readFileSync('data//moveid//' + move + '-chance.txt').toString().split('\n');
  hitchance1 = parseFloat(hitchancestring, 10)
  hitchance = Math.floor(Math.random() * 100) + 1;
  if (hitchance <= hitchance1) {
    successmsg = "but it failed."
    criticalchance = Math.floor(Math.random() * 100) + 1;
    if (criticalchance == 1) {
      if (typeof notes === 'undefined') {
        notes = '\nThe move has been critical!'
      } else {
        notes = notes + '\nThe move has been critical!'
      }
    }
    if (fs.existsSync('data//moveid//' + move + '-enemydamagemin.txt')) {
      if (fs.existsSync('data//moveid//' + move + '-enemydamagemax.txt')) {
        if (fs.existsSync('data//moveid//' + move + '-enemydamagechance.txt')) {
          hitchancestring = fs.readFileSync('data//moveid//' + move + '-enemydamagechance.txt').toString().split('\n');
          hitchance1 = parseFloat(hitchancestring, 10)
          hitchance = Math.floor(Math.random() * 100) + 1;
          if (hitchance <= hitchance1) {
            var movedamageminstring = fs.readFileSync('data//moveid//' + move + '-enemydamagemin.txt').toString().split('\n');
            movedamagemin = parseFloat(movedamageminstring, 10)
            var movedamagemaxstring = fs.readFileSync('data//moveid//' + move + '-enemydamagemax.txt').toString().split('\n');
            movedamagemax = parseFloat(movedamagemaxstring, 10)
            if (movedamagemax == 0) {
              movedamage = 0
            } else {
              movedamage = Math.floor(Math.random() * (movedamagemax - movedamagemin + 1)) + movedamagemin;
              if (criticalchance == 1) {
                movedamage = movedamage * 2
              }
            }
            successmsg = "and it was successful."
            if (movedamage < enemyhp) {
              if (movedamage !== 0) {
                enemyhp = enemyhp - movedamage
                if (typeof notes === 'undefined') {
                  notes = '\nThe move did ' +  movedamage + " damage to <@" + opponentid + ">!"
                } else {
                  notes = notes + '\nThe move did ' + movedamage + " damage to <@" + opponentid + ">!"
                }
              }
            } else {
              if (typeof notes === 'undefined') {
                notes = 'The move did ' + enemyhp + ' damage to <@' + opponentid + '>!'
              } else {
                notes = notes + '\nThe move did ' + enemyhp + ' damage to <@' + opponentid + '>!'
              }
              enemyhp = 0
            }
          } else {
            if (typeof notes === 'undefined') {
              notes = 'The move did not do damage to <@' + opponentid + '>!'
            } else {
              notes = notes + '\nThe move did not do damage to <@' + opponentid + '>!'
            }
          }
        }
      }
    }
    if (fs.existsSync('data//moveid//' + move + '-enemyhealmin.txt')) {
      if (fs.existsSync('data//moveid//' + move + '-enemyhealmax.txt')) {
        if (fs.existsSync('data//moveid//' + move + '-enemyhealchance.txt')) {
          hitchancestring = fs.readFileSync('data//moveid//' + move + '-enemyhealchance.txt').toString().split('\n');
          hitchance1 = parseFloat(hitchancestring, 10)
          hitchance = Math.floor(Math.random() * 100) + 1;
          if (hitchance <= hitchance1) {
            var movehealminstring = fs.readFileSync('data//moveid//' + move + '-enemyhealmin.txt').toString().split('\n');
            movehealmin = parseFloat(movehealminstring, 10)
            var movehealhighstring = fs.readFileSync('data//moveid//' + move + '-enemyhealmax.txt').toString().split('\n');
            movehealhigh = parseFloat(movehealhighstring, 10)
            if (movehealhigh !== 0) {
              moveheal = Math.floor(Math.random() * (movehealhigh-movehealmin)) + movehealmin;
              enemyhp = enemyhp + moveheal
              var maxhealthstring = fs.readFileSync('data//maxhealth//' + opponentid + '.txt').toString().split('\n');
              maxhealth = parseFloat(maxhealthstring, 10)
              if (criticalchance == 1) {
                maxhealth = maxhealth * 2
              }
              successmsg = "and it was successful."
              if (enemyhp > maxhealth) {
                if (typeof notes === 'undefined') {
                  notes = 'The move healed <@' + opponentid + '> by ' + maxhealth + ' HP.'
                } else {
                  notes = notes + '\nThe move healed <@' + opponentid + '> by ' + maxhealth + ' HP.'
                }
                enemyhp = maxhealth
              } else {
                if (typeof notes === 'undefined') {
                  notes = 'The move healed <@' + opponentid + '> by ' + moveheal + ' HP.'
                } else {
                  notes = notes + 'The move healed <@' + opponentid + '> by ' + moveheal + ' HP.'
                }
              }
            }
          } else {
            if (typeof notes === 'undefined') {
              notes = 'The move did not heal <@' + opponentid + '>!'
            } else {
              notes = notes + '\nThe move did not heal <@' + opponentid + '>!'
            }
          }
        }
      }
    }
    if (fs.existsSync('data//moveid//' + move + '-enemypoisonmin.txt')) {
      if (fs.existsSync('data//moveid//' + move + '-enemypoisonmax.txt')) {
        if (fs.existsSync('data//moveid//' + move + '-enemypoisonchance.txt')) {
          hitchancestring = fs.readFileSync('data//moveid//' + move + '-enemypoisonchance.txt').toString().split('\n');
          hitchance1 = parseFloat(hitchancestring, 10)
          hitchance = Math.floor(Math.random() * 100) + 1;
          if (hitchance <= hitchance1) {
            if (fs.existsSync('data//battles//' + message.author.id + '-enemypoison.txt')) {
              if (typeof notes === 'undefined') {
                notes = "The move's poison didn't do anything to <@" + opponentid + ">, because the user already had poison!"
              } else {
                notes = notes + "The move's poison didn't do anything to <@" + opponentid + ">, because the user already had poison!"
              }
            } else {
              var movepoisonminstring = fs.readFileSync('data//moveid//' + move + '-enemypoisonmin.txt').toString().split('\n');
              movepoisonmin = parseFloat(movepoisonminstring, 10)
              var movepoisonhighstring = fs.readFileSync('data//moveid//' + move + '-enemypoisonmax.txt').toString().split('\n');
              movepoisonhigh = parseFloat(movepoisonhighstring, 10)
              if (movepoisonhigh !== 0) {
                movepoison = Math.floor(Math.random() * (movepoisonhigh - movepoisonmin)) + movepoisonmin;
                if (criticalchance == 1) {
                  movepoison = movepoison * 2
                }
                successmsg = "and it was successful."
                if (movepoison < enemyhp) {
                  enemyhp = enemyhp - movepoison
                } else {
                  movepoison = enemyhp - 1
                  enemyhp = 1
                  if (typeof notes === 'undefined') {
                    notes = '**[ALERT]** Poison damage will not occur if the player has 1HP left.'
                  } else {
                    notes = notes + '\n**[ALERT]** Poison damage will not occur if the player has 1HP left.'
                  }
                }
                if (typeof notes === 'undefined') {
                  notes = 'The move gave <@' + opponentid + '> poison. It damaged <@' + opponentid + '> by ' + movepoison + ' damage.'
                } else {
                  notes = notes + '\nThe move gave <@' + opponentid + '> poison. It damaged <@' + opponentid + '> by ' + movepoison + ' damage.'
                }
                fs.writeFile('data//battles//' + opponentid + '-poison.txt', move, function(err) {
                  if (err) throw err;
                });
                fs.writeFile('data//battles//' + opponentid + '-poisonperson.txt', 'enemy', function(err) {
                  if (err) throw err;
                });
              }
            }
          } else {
            if (typeof notes === 'undefined') {
              notes = 'The move did not give poison to <@' + opponentid + '>!'
            } else {
              notes = notes + '\nThe move did not give poison to <@' + opponentid + '>!'
            }
          }
        }
      }
    }
    if (fs.existsSync('data//moveid//' + move + '-userdamagemin.txt')) {
      if (fs.existsSync('data//moveid//' + move + '-userdamagemax.txt')) {
        if (fs.existsSync('data//moveid//' + move + '-userdamagechance.txt')) {
          hitchancestring = fs.readFileSync('data//moveid//' + move + '-userdamagechance.txt').toString().split('\n');
          hitchance1 = parseFloat(hitchancestring, 10)
          hitchance = Math.floor(Math.random() * 100) + 1;
          if (hitchance <= hitchance1) {
            var movedamageminstring = fs.readFileSync('data//moveid//' + move + '-userdamagemin.txt').toString().split('\n');
            movedamagemin = parseFloat(movedamageminstring, 10)
            var movedamagemaxstring = fs.readFileSync('data//moveid//' + move + '-userdamagemax.txt').toString().split('\n');
            movedamagemax = parseFloat(movedamagemaxstring, 10)
            if (movedamagemax == 0) {
              movedamage = 0
            } else {
              movedamage = Math.floor(Math.random() * (movedamagemax - movedamagemin + 1)) + movedamagemin;
              if (criticalchance == 1) {
                movedamage = movedamage * 2
              }
            }
            successmsg = "and it was successful."
            if (movedamage < userhp) {
              if (movedamage !== 0) {
                userhp = userhp - movedamage
                if (typeof notes === 'undefined') {
                  notes = '\nThe move did ' +  movedamage + " damage to " + message.author + "!"
                } else {
                  notes = notes + '\nThe move did ' + movedamage + " damage to " + message.author + "!"
                }
              }
            } else {
              if (typeof notes === 'undefined') {
                notes = 'The move did ' + userhp + ' damage to ' + message.author +  '!'
              } else {
                notes = notes + '\nThe move did ' + userhp + ' damage to ' + message.author +  '!'
              }
              userhp = 0
            }
          } else {
            if (typeof notes === 'undefined') {
              notes = 'The move did not do damage to ' + message.author +  '!'
            } else {
              notes = notes + '\nThe move did not do damage to ' + message.author +  '!'
            }
          }
        }
      }
    }
    if (fs.existsSync('data//moveid//' + move + '-userhealmin.txt')) {
      if (fs.existsSync('data//moveid//' + move + '-userhealmax.txt')) {
        if (fs.existsSync('data//moveid//' + move + '-userhealchance.txt')) {
          hitchancestring = fs.readFileSync('data//moveid//' + move + '-userhealchance.txt').toString().split('\n');
          hitchance1 = parseFloat(hitchancestring, 10)
          hitchance = Math.floor(Math.random() * 100) + 1;
          if (hitchance <= hitchance1) {
            var movehealminstring = fs.readFileSync('data//moveid//' + move + '-userhealmin.txt').toString().split('\n');
            movehealmin = parseFloat(movehealminstring, 10)
            var movehealhighstring = fs.readFileSync('data//moveid//' + move + '-userhealmax.txt').toString().split('\n');
            movehealhigh = parseFloat(movehealhighstring, 10)
            if (movehealhigh !== 0) {
              moveheal = Math.floor(Math.random() * (movehealhigh - movehealmin)) + movehealmin;
              userhp = userhp + moveheal
              var maxhealthstring = fs.readFileSync('data//maxhealth//' + message.author.id +  '.txt').toString().split('\n');
              maxhealth = parseFloat(maxhealthstring, 10)
              if (criticalchance == 1) {
                maxhealth = maxhealth * 2
              }
              successmsg = "and it was successful."
              if (userhp > maxhealth) {
                if (typeof notes === 'undefined') {
                  notes = 'The move healed ' + message.author +  ' by ' + maxhealth + ' HP.'
                } else {
                  notes = notes + '\nThe move healed ' + message.author + ' by ' + maxhealth + ' HP.'
                }
                userhp = maxhealth
              } else {
                if (typeof notes === 'undefined') {
                  notes = 'The move healed ' + message.author +  ' by ' + moveheal + ' HP.'
                } else {
                  notes = notes + 'The move healed ' + message.author + ' by ' + moveheal + ' HP.'
                }
              }
            }
          } else {
            if (typeof notes === 'undefined') {
              notes = 'The move did not heal ' + message.author +  '!'
            } else {
              notes = notes + '\nThe move did not heal ' + message.author + '!'
            }
          }
        }
      }
    }
    if (fs.existsSync('data//moveid//' + move + '-userpoisonmin.txt')) {
      if (fs.existsSync('data//moveid//' + move + '-userpoisonmax.txt')) {
        if (fs.existsSync('data//moveid//' + move + '-userpoisonchance.txt')) {
          hitchancestring = fs.readFileSync('data//moveid//' + move + '-userpoisonchance.txt').toString().split('\n');
          hitchance1 = parseFloat(hitchancestring, 10)
          hitchance = Math.floor(Math.random() * 100) + 1;
          if (hitchance <= hitchance1) {
            if (fs.existsSync('data//battles//' + message.author.id + '-userpoison.txt')) {
              if (typeof notes === 'undefined') {
                notes = "The move's poison didn't do anything to " + message.author + ", because the user already had poison!"
              } else {
                notes = notes + "The move's poison didn't do anything to " + message.author + ", because the user already had poison!"
              }
            } else {
              var movepoisonminstring = fs.readFileSync('data//moveid//' + move + '-userpoisonmin.txt').toString().split('\n');
              movepoisonmin = parseFloat(movepoisonminstring, 10)
              var movepoisonhighstring = fs.readFileSync('data//moveid//' + move + '-userpoisonmax.txt').toString().split('\n');
              movepoisonhigh = parseFloat(movepoisonhighstring, 10)
              if (movepoisonhigh !== 0) {
                movepoison = Math.floor(Math.random() * (movepoisonhigh - movepoisonmin)) + movepoisonmin;
                if (criticalchance == 1) {
                  movepoison = movepoison * 2
                }
                if (movepoison < userhp) {
                  userhp = userhp - movepoison
                } else {
                  movepoison = userhp - 1
                  userhp = 1
                  if (typeof notes === 'undefined') {
                    notes = '**[ALERT]** Poison damage will not occur if the player has 1HP left.'
                  } else {
                    notes = notes + '\n**[ALERT]** Poison damage will not occur if the player has 1HP left.'
                  }
                }
                successmsg = "and it was successful."
                if (typeof notes === 'undefined') {
                  notes = 'The move gave ' + message.author +  ' poison. It damaged ' + message.author +  ' by ' + movepoison + ' damage.'
                } else {
                  notes = notes + '\nThe move gave ' + message.author + ' poison. It damaged ' + message.author +  ' by ' + movepoison + ' damage.'
                }
                fs.writeFile('data//battles//' + opponentid + '-poison.txt', move, function(err) {
                  if (err) throw err;
                });
                fs.writeFile('data//battles//' + opponentid + '-poisonperson.txt', 'user', function(err) {
                  if (err) throw err;
                });
              }
            }
          } else {
            if (typeof notes === 'undefined') {
              notes = 'The move did not give poison to ' + message.author +  '!'
            } else {
              notes = notes + '\nThe move did not give poison to ' + message.author + '!'
            }
          }
        }
      }
    }
    if (successmsg == "and it was successful.") {
      hit = 1
    } else {
      hit = 0
      notes = 'None'
    }
  } else {
    hit = 0
  }
  if (typeof notes === 'undefined') {
    notes = 'None'
  }
  fs.writeFile('data//battles//' + message.author.id + '-hp.txt', userhp, function(err) {
  if (err) throw err;
  });
  if (enemyhp <= 0) {
    fs.unlink('data//battles//' + message.author.id + '-opponent.txt', function (err) {
    if (err) throw err;
    });
    fs.unlink('data//battles//' + opponentid + '-opponent.txt', function (err) {
    if (err) throw err;
    });
    fs.unlink('data//battles//' + message.author.id + '-hp.txt', function (err) {
    if (err) throw err;
    });
    fs.unlink('data//battles//' + opponentid + '-hp.txt', function (err) {
    if (err) throw err;
    });
    const embed = new Discord.RichEmbed()
      .setAuthor('Battle | ' + message.author.username + ' won!')
      .setColor(0xFF0000)
      .setDescription(message.author + ' **VS** ' + '<@' + opponentid + '>')
      .addField(message.author.username + ' used ' + movename, successmsg, false)
      .addField('Status', "**" + message.author + "'s HP**: " + userhp + "\n**<@" + opponentid + ">'s HP**: 0", false)
      .addField('Notes', notes, false)
      .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
    message.channel.send({embed});
    var varpoints = fs.readFileSync('data//coins//' + message.author.id + '.txt').toString().split('\n');
    points = parseFloat(varpoints, 10)
    points = points + 1
    fs.writeFile('data//coins//' + message.author.id + '.txt', points, function(err) {
    if (err) throw err;
    });
    return
  } else {
    if (userhp <= 0) {
      userhp = 1
      if (notes === "None") {
        notes = 'The person who ran the move at this turn can not have less than 1HP.'
      } else {
        notes = notes + '\nThe person who ran the move at this turn can not have less than 1HP.'
      }
    }
    fs.writeFile('data//battles//' + opponentid + '-hp.txt', enemyhp, function(err) {
    if (err) throw err;
    });
    if (hit == 1) {
      const embed = new Discord.RichEmbed()
        .setAuthor('Battle')
        .setColor(0xFF0000)
        .setDescription(message.author + ' **VS** ' + '<@' + opponentid + '>')
        .addField(message.author.username + ' used ' + movename, successmsg, false)
        .addField('Status', "**" + message.author + "'s HP**: " + userhp + "\n**<@" + opponentid + ">'s HP**: " + enemyhp, false)
        .addField('Notes', notes, false)
        .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
      message.channel.send({embed});
    } else {
      const embed = new Discord.RichEmbed()
        .setAuthor('Battle')
        .setColor(0xFF0000)
        .setDescription(message.author + ' **VS** ' + '<@' + opponentid + '>')
        .addField(message.author.username + ' used ' + movename, 'but it failed.', false)
        .addField('Status', "**" + message.author + "'s HP**: " + userhp + "\n**<@" + opponentid + ">'s HP**: " + enemyhp, false)
        .addField('Notes', notes, false)
        .setFooter('Made for fun!', 'https://cdn.discordapp.com/attachments/585988298573348864/590645802339401741/1180px-Checkmark_green.png')
      message.channel.send({embed});
    }
    fs.writeFile('data//battles//' + opponentid + '-going.txt', enemyhp, function(err) {
    if (err) throw err;
    });
    return
  }

  } catch(err) {
    console.log(err);
  }
}

client.login("XXXXXXXXXXXXXXX")
