function GetJeraList(_){
  var List={
   keys:['meiji','taisho','showa','heisei','reiwa'],
   meiji :{Start:{Year:1868,Month:10,Day:23},End:{Year:1912,Month: 7,Day:30}},
   taisho:{Start:{Year:1912,Month: 7,Day:30},End:{Year:1926,Month:12,Day:25}},
   showa :{Start:{Year:1926,Month:12,Day:25},End:{Year:1989,Month: 1,Day: 7}},
   heisei:{Start:{Year:1989,Month: 1,Day: 8},End:{Year:2019,Month: 4,Day:30}},
   reiwa :{Start:{Year:2019,Month: 5,Day: 1},End:{Year:2122,Month:12,Day:31}}
  },u,Year,Month={Now:1,Start:1,End:12},y,Day={Start:1,End:31},Era,JeraYearList=[],I

  if('Era' in _){
    Era=_.Era.toLowerCase()
  }else{
    Era=List.keys[List.keys.length-1]
  }
  if('Month' in _){
    Month.Now=Math.min(Math.max(1,_.Month),12);
    Month.Start=Month.Now}
  if('Year' in _){
    if(typeof _.Year != 'number')if(_.Year.includes('元')){Year=1}
    Year=Math.max(1,_.Year)
  }

  y=List[Era].End.Year-List[Era].Start.Year + 1
  u=List[Era].Start.Year + Year - 1

  if(Year==y && Month.End>=List[Era].End.Month){
    Day.End=List[Era].End.Day
    Month.End=List[Era].End.Month
  }
  if(Year<2 && Month.Start<List[Era].Start.Month){
    Day.Start=List[Era].Start.Day
    Month.Start=List[Era].Start.Month
  }
  Day.End = [31,u%400==0||(u%100&&u%4==0)?29:28,28,31,30,31,30,31,31,30,31,30,31][Month.Now-1]

  for(I=0;I<y;I++){JeraYearList.push(I+1)}
  if('0' in JeraYearList){JeraYearList[0]='元'}

  return {
    Year:{
      Start:List[Era].Start.Year,
      End:List[Era].End.Year,
    },
    Month:{
      Start:Month.Start,
      End:Month.End
    },
    Day:{
      Start:Day.Start,
      End:Day.End
    },
    List:{
      Year:JeraYearList,
      Month:[1,2,3,4,5,6,7,8,9,10,11,12].slice(Month.Start-1,Month.End),
      Day:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].slice(Day.Start-1,Day.End),
    }
  }
}

function GetMonthsList(era,year){
  return GetJeraList({Era:era,Year:year}).List.Month
}

function GetDaysList(era,year,month){
  return GetJeraList({Era:era,Year:year,Month:month}).List.Day
}
