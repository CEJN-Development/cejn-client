export interface DateTimeFormatOptions {
	dateStyle?: 'full' | 'long' | 'medium' | 'short';
	timeStyle?: 'full' | 'long' | 'medium' | 'short';
	calendar?:
		| 'buddhist'
		| 'chinese'
		| 'coptic'
		| 'ethiopia'
		| 'ethiopic'
		| 'gregory'
		| 'hebrew'
		| 'indian'
		| 'islamic'
		| 'iso8601'
		| 'japanese'
		| 'persian'
		| 'roc';
	dayPeriod?: 'long' | 'narrow' | 'short';
	numberingSystem?:
		| 'arab'
		| 'arabext'
		| 'bali'
		| 'beng'
		| 'deva'
		| 'fullwide'
		| 'gujr'
		| 'guru'
		| 'hanidec'
		| 'khmr'
		| 'knda'
		| 'laoo'
		| 'latn'
		| 'limb'
		| 'mlym'
		| 'mong'
		| 'mymr'
		| 'orya'
		| 'tamldec'
		| 'telu'
		| 'thai'
		| 'tibt';
	localeMatcher?: 'best fit' | 'lookup';
	timeZone?: any;
	hour12?: boolean;
	hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
	formatMatcher?: 'basic' | 'best fit';
	weekday?: 'long' | 'narrow' | 'short';
	era?: 'long' | 'narrow' | 'short';
	year?: '2-digit' | 'numeric';
	month?: '2-digit' | 'long' | 'narrow' | 'numeric' | 'short';
	day?: '2-digit' | 'numeric';
	hour?: '2-digit' | 'numeric';
	minute?: '2-digit' | 'numeric';
	second?: '2-digit' | 'numeric';
	fractionalSecondDigits?: 0 | 1 | 2 | 3;
	timeZoneName?: 'long' | 'short';
}
