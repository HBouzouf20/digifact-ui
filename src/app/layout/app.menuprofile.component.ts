import { Component, ElementRef, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
    selector: 'app-menu-profile',
    templateUrl: './app.menuprofile.component.html',
    animations: [
        trigger('menu', [
            transition('void => inline', [
                style({ height: 0 }),
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)', style({ opacity: 1, height: '*' })),
            ]),
            transition('inline => void', [
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)', style({ opacity: 0, height: '0' }))
            ]),
            transition('void => overlay', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)')
            ]),
            transition('overlay => void', [
                animate('.1s linear', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class AppMenuProfileComponent implements OnInit {

    user: User | null = null;
    constructor(public layoutService: LayoutService, public el: ElementRef, private authService: AuthService,
        private router: Router) { }
    ngOnInit(): void {
        this.user = this.authService.getSignedUser();
    }

    toggleMenu() {
        this.layoutService.onMenuProfileToggle();
    }

    get isHorizontal() {
       return this.layoutService.isHorizontal() && this.layoutService.isDesktop();
    }

    get menuProfileActive(): boolean {
        return this.layoutService.state.menuProfileActive;
    }

    get menuProfilePosition(): string {
        return this.layoutService.config.menuProfilePosition;
    }

    get isTooltipDisabled(): boolean {
        return !this.layoutService.isSlim();
    }

    isAdmin() {
       return this.authService.isAdmin()
    }

    getTitle() {
        if(this.user?.username === 'admin') {
            return 'Web Master'
        }
        return this.isAdmin() ? 'Admin' : 'Utilisateur'
    }


    logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
    }
}
