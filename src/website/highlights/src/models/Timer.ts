export interface mTimer {
          timer_id: string;
          timer_name: string;
          pomo_duration: TimeRanges;
          short_break_duration: TimeRanges;
          long_break_duration: TimeRanges;
          pomos_per_long_break: number;
          
}

export interface mPomo_details {
          timer_id: number;
          highlight_id: string;
          pomo_duration: {
              hour: number;
              minute: number;
              second: number;
          };
          short_break_duration: {
              hour: number;
              minute: number;
              second: number;
          };
          long_break_duration: {
              hour: number;
              minute: number;
              second: number;
          };
          pomos_per_long_break: number;
          user_id: number;
      }

