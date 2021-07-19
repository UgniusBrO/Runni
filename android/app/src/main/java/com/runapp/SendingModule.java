package com.runapp;

import android.provider.Settings;
import android.view.ViewDebug;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.WorkerThread;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.wearable.Node;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.Tasks;
import com.google.android.gms.wearable.CapabilityClient;
import com.google.android.gms.wearable.CapabilityInfo;
import com.google.android.gms.wearable.Node;
import com.google.android.gms.wearable.Wearable;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutionException;

public class SendingModule extends ReactContextBaseJavaModule {
    private static final String SET_MESSAGE_CAPABILITY = "start-activity";
    public static final String SET_MESSAGE_PATH = "/start-activity";
    private static final String MESSAGE_TO_SEND1 = "Phone succesful connection";
    private static final String MESSAGE_TO_SEND2 = "you sent this message to the wearable";
    public static String msg = "";
    private static String transcriptionNodeId;
    private static String transcriptionNodeIds;
    private static ReactApplicationContext reactContext;
    SendingModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    public static void pause(int ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            System.err.format("IOException: %s%n", e);
        }
    }
    @ReactMethod
    private void startworkout(String message, int weight, int reps, int count, int sets)
    {
        msg = "Workout: " + message + "\r\nUse Weight: "+ String.valueOf(weight) + "Kg" + "\r\nRepetitions left: " + String.valueOf(reps) + "\r\nSets left: " + String.valueOf(sets) +"\r\nTime Left: " + String.valueOf(count) + " Sec";
        beginSendMessageToWear(3);
    }
    @ReactMethod
    private void resting(int restingTime, String nextWorkout)
    {

        msg = "Rest and don't forget to drink water" + "\r\nResting time: " + String.valueOf(restingTime) + " Sec" + "\r\nNext workout: \r\n" + nextWorkout;
        beginSendMessageToWear(3);
    }
    @ReactMethod
    private void competing(String message)
    {
        msg = message;
        beginSendMessageToWear(3);
    }
    @ReactMethod
    private void beginSendMessageToWear(Integer nr) {

        AsyncTask.execute(() -> {

                /*
                    REFERENCE: Android Doccumentation
                    URL: https://developer.android.com/training/wearables/data-layer/events.html#Listen
                    LAST ACCESSED: 18/02/2018
                */
            CapabilityInfo capabilityInfo;
            try {

                capabilityInfo = Tasks.await(
                        Wearable.getCapabilityClient(reactContext).getCapability(SET_MESSAGE_CAPABILITY, CapabilityClient.FILTER_REACHABLE));
                updateTranscriptionCapability(capabilityInfo);
                if(nr == 1)
                {
                                    requestTranscription(MESSAGE_TO_SEND1.getBytes());
                }
                if(nr == 2)
                {
                                    requestTranscription(MESSAGE_TO_SEND2.getBytes());
                }
                if(nr == 3)
                {
                    requestTranscription(msg.getBytes());
                }
                Log.d("aaaacapa", String.valueOf(capabilityInfo));
                // END REFERENCE

            } catch (ExecutionException e) {
                Log.d("aaaacapaerr", String.valueOf(e));
                e.printStackTrace();
            } catch (InterruptedException e) {
                Log.d("aaaacapaerr2", String.valueOf(e));
                e.printStackTrace();
            }
        });

    }
    private void updateTranscriptionCapability(CapabilityInfo capabilityInfo) {
        Set<Node> connectedNodes = capabilityInfo.getNodes();
        Collection<String> nodes = getNodes();
        Log.d("paejo", String.valueOf(nodes));
        Log.d("aaaaa", String.valueOf(connectedNodes));
        Task<List<Node>> nodeListTask = Wearable.getNodeClient(reactContext).getConnectedNodes();
        Log.d("paejo2", String.valueOf(nodeListTask));
        transcriptionNodeId = nodes.iterator().next();
        transcriptionNodeIds = String.valueOf(nodes);
        Log.d("paejo3", transcriptionNodeId);
        Log.d("paejo33", transcriptionNodeIds);
    }
    @WorkerThread
    private Collection<String> getNodes() {
        HashSet<String> results = new HashSet<>();

        Task<List<Node>> nodeListTask =
                Wearable.getNodeClient(reactContext).getConnectedNodes();

        try {
            // Block on a task and get the result synchronously (because this is on a background
            // thread).
            List<Node> nodes = Tasks.await(nodeListTask);

            for (Node node : nodes) {
                results.add(node.getId());
                Log.d("ConnectedNodes: ", String.valueOf(results));
            }

        } catch (ExecutionException exception) {
            Log.d("Task failed: ", String.valueOf(exception));

        } catch (InterruptedException exception) {
            Log.d("Interrupt occurred: ", String.valueOf(exception));
        }

        return results;
    }
    private String pickBestNodeId(HashSet<Node> nodes) {
        String bestNodeId = "n";
        for (Node node : nodes) {
            if (node.isNearby()) {
                return node.getId();
            }
            bestNodeId = node.getId();
        }
        Log.d("aaaa", bestNodeId);
        return bestNodeId;

    }
    // End reference.

    private void requestTranscription(final byte[] message) {

        AsyncTask.execute(() -> {
            if (transcriptionNodeId != null) {
                Log.d("paejo4", transcriptionNodeId);
                final Task<Integer> sendTask = Wearable.getMessageClient(reactContext).sendMessage(transcriptionNodeId, SET_MESSAGE_PATH, message);
                Log.d("paejo5", String.valueOf(sendTask));
                Log.d("paejo6", String.valueOf(message));
                Log.d("paejo6", SET_MESSAGE_PATH);
                sendTask.addOnSuccessListener(dataItem -> Log.d("MESSAGESTATE", "SUCCESS"));
                sendTask.addOnFailureListener(dataItem -> Log.d("MESSAGESTATE", "FAILURE"));
                sendTask.addOnCompleteListener(task -> Log.d("MESSAGESTATE", "COMPLETE"));
            }
        });
    }
    @NonNull
    @Override
    public String getName() {
        return "CCC";
    }
}