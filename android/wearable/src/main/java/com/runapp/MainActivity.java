package com.runapp;

import android.os.Bundle;
import android.widget.TextView;

import androidx.fragment.app.FragmentActivity;
import androidx.wear.ambient.AmbientModeSupport;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.google.android.gms.wearable.MessageClient;
import com.google.android.gms.wearable.MessageEvent;
import com.google.android.gms.wearable.Wearable;

public class MainActivity extends FragmentActivity implements  MessageClient.OnMessageReceivedListener{
    private static final String START_ACTIVITY_PATH = "/start-activity";
    private TextView mTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = (TextView) findViewById(R.id.text);
        Wearable.getMessageClient(this).addListener(this);
        // Enables Always-on
        // setAmbientEnabled();
    }
        @Override
        public void onMessageReceived(MessageEvent messageEvent) {

            String s2="Winning";
            String s1="Losing";
            String income = new String(messageEvent.getData());
            Log.d("atejo", income);
            mTextView.setText(income);
            if(income.equals(s2))
            {
                setContentView(R.layout.activity_main3);
                            mTextView.setText(income);
            }
            if(income.equals(s1))
            {
                setContentView(R.layout.activity_main2);
                            mTextView.setText(income);
            }
        }

        @Override
        public void onResume() {
            super.onResume();
            Wearable.getMessageClient(this).addListener(this);
        }

        @Override
        protected void onPause() {
            super.onPause();
            Wearable.getMessageClient(this).removeListener(this);
        }
    }