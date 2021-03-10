import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mj';
  screenWidth;
  navLinks;
  isExpanded: boolean;
  activeLinkUrl: string;
  activeLinkIndex: number;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  
  opened: boolean = true;


  constructor(){
    this.isExpanded = true;
    this.activeLinkIndex = -1;

    this.screenWidth = window.innerWidth;
    //console.log(this.screenWidth);
    if(this.screenWidth<=599){
      this.opened = false;
    }else{
      this.opened=true;
    }
    window.onresize = ()=>{
      this.screenWidth = window.innerWidth;
      if(this.screenWidth<=599){
        //this.sidenav.toggle();
        //console.log(this.screenWidth);
        this.opened = false;
      }else{
        this.opened = true;
        //console.log('-----else innerwidth----');
      }
    }
    
    //----create left navigations-----//
    this.navLinks = [
      {
        index: 1,
        label: 'Add Task',
        link: 'tasks/alltasks/addnew',
        iconName: 'playlist_add',
        isPanelHiddenParent: false,
        isPanelParent: false
      },
      {
        index: 0,
        label: 'Dashboard',
        link: 'dashboard',
        iconName: 'dashboard',
        isPanelHiddenParent: false,
        isPanelParent: false
      },
      {
        index: 0,
        label: 'Stocks',
        link: 'stocks',
        iconName: 'equalizer',
        isPanelHiddenParent: false,
        isPanelParent: false
      },
      {
        index: 2,
        label: 'Calendar',
        link: 'tasks/calendar',
        iconName: 'calendar_today',
        isPanelHiddenParent: false,
        isPanelParent: false
      },
      // {
      //   index: 0,
      //   label: 'Calendar',
      //   link: 'tasks/alltasks/calendar',
      //   iconName: 'calendar_today',
      //   isPanelHiddenParent: false,
      //   isPanelParent: false
      // },
      {
        index: 3,
        label: 'All Tasks',
        link: 'tasks/alltasks',
        iconName: 'list',
        isPanelHiddenParent: false,
        isPanelParent: false
      },
      // {
      //   index: 0,
      //   label: 'All Tasks Preload',
      //   link: 'tasks/alltasks/alltaskspreloaded',
      //   iconName: 'list',
      //   isPanelHiddenParent: false,
      //   isPanelParent: false
      // },
      // {
      //   index: 0,
      //   label: 'Calendarpc',
      //   link: 'tasks/alltasks/calendarpc',
      //   iconName: 'calendar_today',
      //   isPanelHiddenParent: false,
      //   isPanelParent: false
      // },
      {
        index: 4,
        label: 'Admin Panel',
        link: './admin-panel',
        iconName: 'info',
        isPanelHiddenParent:true,
        isPanelParent:true,
        children:[
          {
            index:0,
            label: 'Users List',
            link: '/users',
            iconName: 'home'
          },
          {
            index:0,
            label: 'Posts List',
            link: '/posts',
            iconName: 'home'
          }
        ]
      },
      // {
      //   index: 1,
      //   label: 'Tasks',
      //   link: './tasks',
      //   iconName: 'autorenew',
      //   isPanelHiddenParent:true,
      //   isPanelParent:true,
      //   children:[
      //     {
      //       index:0,
      //       label: 'Tasks',
      //       link: '/tasks/alltasks',
      //       iconName: 'customer'
      //     },
      //     {
      //       index:0,
      //       label: 'Office Tasks',
      //       link: '/tasks/officetasks',
      //       iconName: 'customer'
      //     },
      //     {
      //       index:0,
      //       label: 'Home Tasks',
      //       link: '/tasks/hometasks',
      //       iconName: 'home'
      //     }
      //   ]
      // }
    ]

  }

  showPanelItem(link: any, isExpanded: boolean) {
    const retValue = link.isPanelParent === true && isExpanded === true;
    //console.log(retValue);
    return retValue;

  }
 

 

  

}
