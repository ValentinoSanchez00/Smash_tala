import {TestBed} from '@angular/core/testing';

import {AboutUsComponent} from './about-us.component';

describe('AboutUsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AboutUsComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AboutUsComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

});