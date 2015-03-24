#!/usr/local/bin/node
var users = {
	alice: {
        u: {
            gender: 'female',
            age: '23',
            body: 'slim'
        },
        p: {
            gender: {
                male: 9,
                female: 1
            },
            age: {
                '20-24': 3,
                '25-29': 6,
                '30-34': 1
            },
            body: {
                athletic: 5,
                average: 4,
                slim: 1
            }
        }
    },
	amy: {
        u: {
            gender: 'female',
            age: '30',
            body: 'average'
        },
        p: {
            gender: {
                male: 20,
            },
            age: {
                '25-29': 5,
                '30-34': 10,
                '35-40': 5
            },
            body: {
                athletic: 18,
                average: 2,
            }
        }
    },
	bob: {
        u: {
            gender: 'male',
            age: '26',
            body: 'athletic'
        },
        p: {
            gender: {
                female: 95,
                male: 5
            },
            age: {
                '20-24': 70,
                '25-29': 20,
                '30-34': 10
            },
            body: {
                slim: 50,
                average: 30,
                overweight: 20,
            }
        }
    },
	ben: {
        u: {
            gender: 'male',
            age: '33',
            body: 'average'
        },
        p: {
            gender: {
                female: 50
            },
            age: {
                '20-24': 5,
                '25-29': 20,
                '30-34': 20,
                '35-39': 5
            },
            body: {
                slim: 5,
                average: 20,
                overweight: 25,
            }
        }
    },
};

function compatibility (u1, u2) {
  var profile = users[u2].u;
  var attributeScores = [];
  for (var attribute in users[u1].p) {
    var v = users[u1].p[attribute];
    var n = 0;
    var d = 0;
    for (var jj in users[u1].p[attribute]) {
      d += users[u1].p[attribute][jj];

      switch (attribute) {
        case 'gender':
        case 'body':
          if (jj == profile[attribute]) {
            n = users[u1].p[attribute][jj];
          };
          break;
        case 'age':
          var ageRange = jj.split('-');
          if (ageRange[0] <= profile[attribute]
              && ageRange[1] >= profile[attribute]) {
            n = users[u1].p[attribute][jj];
          };
          break;
      }
    }
    if (0 === n) {
      return 0;
    }
    attributeScores.push(n / d);
  }
  var n = 0;
  for (var ii in attributeScores) {
    n += attributeScores[ii];
  }
  return (n / attributeScores.length).toFixed(2);
}

function recommend (u1) {
  var userNames = Object.keys(users);
  var recommendations = [];

  for (var ii in userNames) {
    var userName = userNames[ii];
    if (u1 === userName) {
      continue;
    }

    var score = compatibility(u1, userName);
    if (score > 0) {
      var rscore = (2.0 / (Math.pow(score, -1) + Math.pow(compatibility(userName, u1), -1)));
      console.log(u1 + ' -> ' + userName + ' = ' + score + ' = ' + rscore);
      recommendations.push({user: userName, rscore: rscore.toFixed(2)});
    }
  }
  recommendations.sort(function(a, b) { return b.rscore - a.rscore; });
  return recommendations;
}

// ===========================================================================
// -- TEST -------------------------------------------------------------------
// ===========================================================================

// Print the compatibility table
console.log('Table:');
var keys = Object.keys(users);
for (var ii in keys) {
  var u1 = keys[ii];
  for (var jj in keys) {
    var u2 = keys[jj];
    if (u1 !== u2) {
      console.log(u1 + ' -> ' + u2 + ' = ' + compatibility(u1, u2));
    }
  }
}

// Print the recommended users for Ben
console.log('Recommendations:');
console.log(recommend('ben'));

/* vi:set et sw=2 ts=2: */

