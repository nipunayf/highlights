export interface mTimer {
          timer_id: string;
          timer_name: string;
          pomo_duration: TimeRanges;
          short_break_duration: TimeRanges;
          long_break_duration: TimeRanges;
          pomos_per_long_break: number;
          
}

export interface mPomo_details {
          timer_id: string;
          highlight_id: string;
          pomoDuration: TimeRanges;
          shortBreakDuration: TimeRanges;
          longBreakDuration: TimeRanges;
          pomos_per_long_break : number;
          user_id: string;

}

